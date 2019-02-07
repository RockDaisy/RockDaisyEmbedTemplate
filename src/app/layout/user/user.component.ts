import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService, DataService} from '../../shared/services';
import {User} from '../../shared/services/models/user';
import {catchError} from 'rxjs/operators';
import {NotificationService} from "@progress/kendo-angular-notification";

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
              private dataService: DataService,
              private fb: FormBuilder,
              private notificationService: NotificationService) {
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

    this.form = this.fb.group({
      Username: [{value: this.user.Username, disabled: true}, [
        Validators.required,
      ]],
      FirstName: [this.user.FirstName, [
        Validators.required,
      ]],
      LastName: [this.user.LastName, [
        Validators.required,
      ]],
      PhoneNumber: [this.user.PhoneNumber, []],
      CustomField: [this.user.CustomField, []],
      ChangePassword: [false, []],
      CurrentPassword: ['', []],
      Password: ['', []],
      ConfirmPassword: ['', []]
    }, {validator: UserComponent.refreshConfirmValidation});

    this.dataService.getUser(this.user.Id)
      .pipe(catchError((error: HttpErrorResponse): any => {
        this.error = error.message;
        this.inProgress = false;
        return Observable.throw(error);
      }))
      .subscribe((user: User) => {
        this.inProgress = false;
        this.user = user;

        this.form.controls['PhoneNumber'].setValue(this.user.PhoneNumber);
        this.form.controls['CustomField'].setValue(this.user.CustomField);
        this.form.controls['Password'].setValue(this.user.Password);
      });

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
      });

    this.permissions = [];

  }

  public onSubmit(form: any, isValid: boolean) {
    if (isValid) {
      this.inProgress = true;

      let userInfo = this.user;
      Object.assign(userInfo, form);

      this.dataService.updateUser(userInfo)
        .pipe(catchError((error: HttpErrorResponse): any => {
          this.error = error.message;
          this.inProgress = false;
          return Observable.throw(error);
        }))
        .subscribe((user: User) => {
          this.inProgress = false;
          this.auth.setUserInfo(user);
          this.user = user;

          this.notificationService.show({
            content: 'User changes successfully saved.',
            position: { horizontal: 'right', vertical: 'top' },
            animation: { type: 'slide', duration: 30 },
            type: { style: 'success', icon: true }
          });
        });
    }
  }
}
