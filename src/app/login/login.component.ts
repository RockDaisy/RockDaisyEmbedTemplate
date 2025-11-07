import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
	selector: 'app-login',
	standalone: false,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	public error = '';
	login: FormControl;
	password: FormControl;
	loginForm: FormGroup;
	isInProgress: boolean;

	constructor(private router: Router, private auth: AuthService) {
	}

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

	onSubmitForm(ev: Event): void {
		this.error = '';

		if(this.loginForm.valid) {
			this.isInProgress = true;
			const form = this.loginForm.getRawValue();
			const params = {'grant_type': 'password', 'username': form.login, 'password': form.password};

			this.auth.authenticate(params)
				.pipe(catchError((error: string): any => {
					this.error = error || 'Server Error. Please try again later.';

					this.isInProgress = false;

					return throwError(() => new Error(this.error));
				}))
				.subscribe(() => {
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
