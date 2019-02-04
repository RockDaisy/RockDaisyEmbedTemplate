import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable()
export class DataService {

  constructor(private api: ApiService) { }

    public getDashboards(): Observable<any> {
        return this.api.get('/api/dashboards');
    }
}
