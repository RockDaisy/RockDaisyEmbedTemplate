import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import {Router} from '@angular/router';
import {Store} from './store.service';
import {environment} from '../../../environments/environment';
import {NotificationService} from '@progress/kendo-angular-notification';
import {catchError} from "rxjs/operators";

@Injectable()
export class ApiService {
  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': '*',
    'Accept': '*/*'
  });
  public API_URL = environment.apiUrl;

  constructor(private router: Router,
              private store: Store,
              private http: HttpClient,
              private notificationService: NotificationService) {
  }

  private errorHandler(response: any) {
    if (response.status === 401 || response.status === 403) {
      window.localStorage.clear();
      this.store.purge();
      this.router.navigate(['login']);
      this.notificationService.show({
        content: 'Authorization failed. Please, sign in again.',
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: true }
      });

      return response;
    } else {
      const errorMessage = response.error && response.error.Message || response.statusText;
      const error = new Error(errorMessage);
      error['response'] = response;
      console.log(error);
      return Observable.throw(error);
    }
  }

  get(path: string, isBlob: boolean = false): Observable<any> {
    let requestParameters: any = {headers: this.headers};

    if (isBlob) {
      requestParameters.responseType = 'blob';
    }

    return this.http.get(`${this.API_URL}${path}`, requestParameters)
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  postOrPut(isNew: boolean, path: string, body): Observable<any> {
    return isNew ? this.post(path, body) : this.put(path, body); // POST is used for new objects as resource URL is not known yet
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.API_URL}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  put(path: string, body): Observable<any> {
    return this.http.put(
      `${this.API_URL}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  delete(path, params?: any): Observable<any> {
    return this.http.delete(
      `${this.API_URL}${path}`,
      {headers: this.headers, params: params}
    )
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  public serializeParams(obj: any) {
    return new HttpParams({fromObject: obj}).toString();
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers = this.headers.set(header, headers[header]));
  }
}
