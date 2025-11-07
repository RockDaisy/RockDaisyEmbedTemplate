import {Injectable} from '@angular/core';
import {StoreHelper} from './store-helper.service';
import {Store} from './store.service';
import {ApiService} from './api.service';
import {Observable, switchMap, tap, throwError} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Location} from '@angular/common';
import {catchError} from 'rxjs/operators';
import {User} from './models/user';

@Injectable({
	providedIn: 'root'
})

@Injectable()
export class AuthService implements CanActivate {
	JWT_KEY = 'retain_token';
	JWT = 'user_info';
	CACHED_LOCATION = 'CACHED_LOCATION';
	INACTIVE_TIME = 60 * 20; // 20 minutes
	isAlreadyRedirected = false;

	constructor(private idle: Idle,
		private storeHelper: StoreHelper,
		private api: ApiService,
		private router: Router,
		private store: Store,
		private http: HttpClient,
		private location: Location) {
		const token = window.localStorage.getItem(this.JWT_KEY);
		const info = window.localStorage.getItem(this.JWT);

		if(token) {
			this.setJwt(token);
		}

		if(info) {
			this.setUserInfo(JSON.parse(info));
		}
	}

	setJwt(jwt: string) {
		window.localStorage.setItem(this.JWT_KEY, jwt);
		this.api.setHeaders({Authorization: jwt});
		this.idle.setIdle(5);
		// sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
		this.idle.setTimeout(this.INACTIVE_TIME);
		// sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
		this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
		this.idle.onTimeout.subscribe(() => {
			this.cacheLocation();
			this.signOut(true);
		});
		this.idle.watch();
	}

	public setUserInfo(info: any) {
		this.storeHelper.update('user', info);
	}

	public getUserInfo(): User {
		return new User(this.store.getState()['user']);
	}

	isAuthorized(): boolean {
		return Boolean(window.localStorage.getItem(this.JWT_KEY));
	}

	canActivate(): boolean {
		const canActivate = this.isAuthorized();

		this.onCanActivate(canActivate);

		return canActivate;
	}

	cacheLocation(): void {
		const route = this.location.path();

		if(route !== '/') {
			this.storeHelper.add(this.CACHED_LOCATION, route);
		}
	}

	getCachedLocation(): string {
		const cachedLocation = this.store.getState()[this.CACHED_LOCATION];

		if(cachedLocation && cachedLocation.length) {
			this.storeHelper.update(this.CACHED_LOCATION, null);

			return cachedLocation[0];
		}

		return '';
	}

	onCanActivate(canActivate: boolean) {
		if(!canActivate) {
			this.cacheLocation();
			this.router.navigate(['login']);
		}
	}

	authenticate(credentials: Record<string, any>): Observable<any> {
		return this.http.post(
			`${this.api.API_URL}/oauth2/token`,
			this.api.serializeParams(credentials),
			{
				headers: new HttpHeaders({
					'Content-Type': 'application/x-www-form-urlencoded',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Methods': '*',
					'Accept': '*/*'
				})
			}
		)
			.pipe(tap((res: any) => this.setJwt(res.access_token)),
				switchMap(() => this.api.get('/api/config')),
				tap((res: any) => this.setUserInfo(res)),
				tap((res: any) => window.localStorage.setItem(this.JWT, JSON.stringify(res))),
				catchError(err => throwError(() => err)));
	}

	getUserLoginLink() {
		return this.api.get('/api/userLoginLink');
	}

	signOut(isTimeoutSignOut: boolean) {
		if(isTimeoutSignOut) {
			this.cacheLocation();
		}
		window.localStorage.removeItem(this.JWT_KEY);
		window.localStorage.removeItem(this.JWT);
		this.storeHelper.update('user', null);
		this.router.navigate(['login']);
		this.idle.stop();
	}
}
