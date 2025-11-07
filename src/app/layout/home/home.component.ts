import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FiltersService, Store, StoreHelper} from '../../shared';
import {AppFilter, FilterType} from '../../shared/components/filter/models/filter';

@Component({
	selector: 'app-home',
	standalone: false,
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
	public API_URL = environment.apiUrl;
	public filters: AppFilter[];
	public views: SafeResourceUrl[] = [];

	constructor(private store: Store, private storeHelper: StoreHelper, private sanitizer: DomSanitizer, private filtersService: FiltersService) {
		this.refreshViews('');
	}

	public onFiltersSubmitClick() {
		const serializedFilters = this.filtersService.serializeFilters(this.filters);

		if(serializedFilters) {
			this.refreshViews(serializedFilters);
		}
	}

	ngOnInit(): void {
		this.filters = [
			new AppFilter({
				Key: '@DateRange',
				Label: 'Date Range',
				Type: FilterType.DateRange,
				Options: {},
				Value: {start: null, end: null}
			}),

			new AppFilter({
				Type: FilterType.DropDown,
				Key: '@PlayerId',
				Label: 'Player',
				Options: {
					defaultValue: {PlayerId: null, PlayerFullName: 'Select Player...'},
					textField: 'PlayerFullName',
					valueField: 'PlayerId',
					dataSourceId: 125,
					data: [],
					source: [],
				},
				Value: null
			}),

			new AppFilter({
				Type: FilterType.MultiSelect,
				Key: '@TeamIds',
				Label: 'Team',
				Options: {
					defaultValue: 'Select Team(s)...',
					textField: 'TeamName',
					valueField: 'TeamId',
					dataSourceId: 68,
					data: [],
					source: [],
				},
				Value: []
			})
		];
	}

	private refreshViews(serializedFilters: string) {
		const token: Record<string, any> = this.store.getState()['LOGIN_LINK'];
		const loginLink = token && token[0] || '';

		this.views = [
			this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `/view/757?loginLink=${loginLink}&filters=${serializedFilters}&fullScreen={"hideHeaderLogo":true}`),
			this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `/view/758?loginLink=${loginLink}&filters=${serializedFilters}&fullScreen={"hideHeaderLogo":true}`),
			this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `/view/759/?loginLink=${loginLink}&filters=${serializedFilters}&fullScreen={"hideHeaderLogo":true}`)
		];

		if(loginLink) {
			this.storeHelper.update('LOGIN_LINK', null);
		}
	}
}
