import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {AuthService} from '../shared/services/auth.service'
import {
  FormGroup,
  FormControl,
  Validators,

} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../shared/services';
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})

export class LoginComponent implements OnInit {
  public error = '';
  login: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  isInProgress: boolean;

  ngOnInit(): void {
    this.isInProgress = false;
    this.login = new FormControl('', [
      Validators.required
    ]);
    this.password = new FormControl('', [
      Validators.required
    ]);

    this.loginForm = new FormGroup({
      login: this.login,
      password: this.password
    });
  }

  constructor(private router: Router, private auth: AuthService) {
  }

  onSubmitForm(form: any, isValid: boolean): void {
    this.error = '';

    if (isValid) {
      this.isInProgress = true;
      const params = {'grant_type': 'password', 'username': form.login, 'password': form.password};

      this.auth.authenticate(params)
        .pipe(catchError((response: HttpErrorResponse): any => {
          this.error = (response.error && response.error.error_description) ?
            response.error.error_description :
            'Server Error. Please try again later.';

          this.isInProgress = false;
          return Observable.throw(response);
        }))
        .subscribe((user: User) => {
          this.isInProgress = false;

          const cachedLocation = this.auth.getCachedLocation();

          if (cachedLocation) {
            this.router.navigateByUrl(cachedLocation);
          } else {
            this.router.navigate(['home']);
          }
        });
    }
  }

}
