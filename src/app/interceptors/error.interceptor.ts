import {HttpContextToken, HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {isString} from '@progress/kendo-angular-common';

export const SHOW_NOTIFICATION_TOKEN = new HttpContextToken(() => true);

export const errorInterceptor: HttpInterceptorFn = (req, next) => next(req).pipe(
	catchError((response: any) => {
		let errMsg: string;

		if(response.error && response.error.title && response.error.errors) {
			errMsg = response.error.title + '<br>';

			errMsg += Object.keys(response.error.errors).map(key => response.error.errors[key]).join('<br>');
		} else if(response instanceof HttpErrorResponse && req.url.indexOf('account/login') === -1) {
			if(isString(response.error)) {
				errMsg = response.error;
			} else if(response.error && (response.error.Message || response.error.ExceptionMessage || response.error.error_description)) {
				errMsg = response.error.ExceptionMessage || response.error.Message || response.error.error_description;
			} else {
				switch(response.status) {
					case 401:
						errMsg = 'Your session was closed. Please re-login.';
						break;
					case 404:
						errMsg = 'Resource not found.';
						break;
					case 417:
						errMsg = 'rd-composite-response';
						break;
					default:
						errMsg = 'Server Error occurred. Please try again later or contact your System Administrator.';
				}
			}

			if(req.context.get<boolean>(SHOW_NOTIFICATION_TOKEN)) {
				console.error(errMsg);
			}
		} else {
			console.error(response);
		}

		return throwError(() => errMsg || response);
	})
);
