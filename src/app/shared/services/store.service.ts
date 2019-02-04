import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {distinctUntilChanged} from 'rxjs/operators';

export interface Entity {
    color: string,
    title: string,
    value: string,
    id?: string | number,
    createdAt?: string,
    updatedAt?: string,
    userId?: string
}

export interface State {
    notes: Array<Entity>
}
const defaultState = {
    notes: []
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
    private _store = _store;
    changes = this._store.asObservable().pipe(distinctUntilChanged());

    setState(state: State) {
        this._store.next(state);
    }

    getState(): State {
        return this._store.value;
    }

    purge() {
        this._store.next(defaultState);
    }
}
