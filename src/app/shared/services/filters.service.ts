import {Injectable} from '@angular/core';
import {formatDate} from '@telerik/kendo-intl';
import {AppFilter, FilterType} from "../components/filter/models/filter";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() {
  }

  private serializeFilterValues(filter: AppFilter): string {
    let serializedValues = '';

    if (filter.hasValue()) {
      switch (filter.Type) {
        case FilterType.DateRange:
          serializedValues = `${formatDate(filter.Value.start, "u")}|${formatDate(filter.Value.end, "u")}`
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

  public serializeFilters(filters: Array<AppFilter>): string {
    const serialized = filters
      .filter(filter => filter.hasValue())
      .map((filter) => `${filter.Key}=${this.serializeFilterValues(filter)}`)
      .join('&');

    return encodeURIComponent(serialized).replace(/%/g, '__');
  };

}
