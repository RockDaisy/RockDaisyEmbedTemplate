import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

export interface Entity {
	color: string;
	title: string;
	value: string;
	id?: string | number;
	createdAt?: string;
	updatedAt?: string;
	userId?: string;
}

export interface State {
	notes: Entity[];
}

const defaultState = {
	notes: []
};
const store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
	private _store = store;

	setState(state: Record<string, any>) {
		this._store.next(state as State);
	}

	getState(): Record<string, any> {
		return this._store.value;
	}

	purge() {
		this._store.next(defaultState);
	}
}
