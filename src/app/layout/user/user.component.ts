import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService, ApiService, User} from '../../shared/services';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {
  form: FormGroup;
  inProgress = false;
  permissions: Array<string>;
  error = '';
  public user: User;

  constructor(private router: Router, private auth: AuthService,
              private api: ApiService,
              private fb: FormBuilder) {
  }

  public static validateConfirmPassword(fc: FormControl) {
    if (fc.parent && fc.parent.controls['ConfirmPassword'].value === fc.parent.controls['Password'].value) {
      return (null);
    } else {
      return ({validateConfirmPassword: true});
    }
  }

  public static refreshConfirmValidation(formGroup: FormGroup) {
    if (formGroup.controls['ChangePassword'].value && formGroup.controls['ConfirmPassword'].value &&
      formGroup.controls['ConfirmPassword'].value === formGroup.controls['Password'].value &&
      (formGroup.controls['Password'].errors || formGroup.controls['ConfirmPassword'].errors)) {
      formGroup.controls['Password'].updateValueAndValidity({onlySelf: true});
      formGroup.controls['ConfirmPassword'].updateValueAndValidity({onlySelf: true});
    }
  }

  ngOnInit() {
    this.user = this.auth.getUserInfo();

    this.permissions = [];
    this.form = this.fb.group({
      Username: [{value: this.user.Username, disabled: true}, [
        Validators.required,
      ]],
      ChangePassword: [false, []],
      CurrentPassword: ['', []],
      Password: ['', []],
      ConfirmPassword: ['', []]
    }, {validator: UserComponent.refreshConfirmValidation});

    this.form.get('ChangePassword').valueChanges.subscribe((changePassword: boolean) => {
        if (changePassword) {
          this.form.get('CurrentPassword').setValidators([Validators.required, Validators.minLength(5)]);
          this.form.get('Password').setValidators([UserComponent.validateConfirmPassword, Validators.required, Validators.minLength(5)]);
          this.form.get('ConfirmPassword').setValidators([UserComponent.validateConfirmPassword, Validators.required, Validators.minLength(5)]);
        } else {
          this.form.get('CurrentPassword').setValidators([]);
          this.form.get('Password').setValidators([]);
          this.form.get('ConfirmPassword').setValidators([]);
        }

        this.form.get('CurrentPassword').updateValueAndValidity();
        this.form.get('Password').updateValueAndValidity();
        this.form.get('ConfirmPassword').updateValueAndValidity();
      }
    );

  }

  public onSubmit(form: any, isValid: boolean) {
    if (isValid) {
      this.inProgress = true;

      this.api.put(`/ui/users/${this.user.Username}`, form)
        .pipe(catchError((error: HttpErrorResponse): any => {
          this.error = error.message;
          this.inProgress = false;
          return Observable.throw(error);
        }))
        .subscribe((user: User) => {
          this.inProgress = false;
          this.auth.setUserInfo(user);
        });
    }
  }
}
