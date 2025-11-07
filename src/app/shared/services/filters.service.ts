import {Injectable} from '@angular/core';
import {AppFilter, FilterType} from '../components/filter/models/filter';
import {format} from '@progress/kendo-angular-intl';

@Injectable({
	providedIn: 'root'
})
export class FiltersService {

	public serializeFilters(filters: AppFilter[]): string {
		const serialized = filters
			.filter(filter => filter.hasValue())
			.map((filter) => `${filter.Key}=${this.serializeFilterValues(filter)}`)
			.join('&');

		return encodeURIComponent(serialized).replace(/%/g, '__');
	};

	private serializeFilterValues(filter: AppFilter): string {
		let serializedValues = '';

		if (filter.hasValue()) {
			switch (filter.Type) {
				case FilterType.DateRange:
					serializedValues = `${format(filter.Value.start, 'u')}|${format(filter.Value.end, 'u')}`
						.replace(/\//g, '-');
					break;
				case FilterType.MultiSelect:
					serializedValues = filter.Value.join(',');
					break;
				default:
					serializedValues = filter.Value.toString();
					break;

			}
		}

		return serializedValues;
	};
}
