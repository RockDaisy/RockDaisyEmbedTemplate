import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {User} from './models/user';

@Injectable()
export class DataService {

	constructor(private api: ApiService) {
	}

	public getDashboards(): Observable<any> {
		return this.api.get('/api/dashboards');
	}

	public getUser(userId: string): Observable<any> {
		return this.api.get('/api/users/' + userId);
	}

	public updateUser(entity: User): Observable<any> {
		return this.api.put('/api/users', entity);
	}

	public getDataSourceData(id: number): Observable<any> {
		return this.api.get(`/api/datasources/${id}/data`);
	}
}
