import { Injectable } from '@angular/core';
import { Store } from './store.service';

@Injectable()
export class StoreHelper {
	constructor(private store: Store) {}

	update(prop: string, state: Record<string, any> | null) {
		const currentState = this.store.getState();

		this.store.setState(Object.assign({}, currentState, { [prop]: state }));
	}

	add(prop: string, state: Record<string, any> | string) {
		const currentState = this.store.getState();
		const collection = currentState[prop] || [];

		this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
	}

	findAndUpdate(prop: string, state: Record<string, any>) {
		const currentState = this.store.getState();
		const collection = currentState[prop];

		this.store.setState(Object.assign({}, currentState, {[prop]: collection.map((item: Record<string, any>) => {
			if (item.id !== state.id) {
				return item;
			}

			return Object.assign({}, item, state);
		})}));
	}

	findAndDelete(prop: string, id: string) {
		const currentState = this.store.getState();
		const collection = currentState[prop];

		this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter((item: Record<string, any>) => item.id !== id)}));
	}
}
