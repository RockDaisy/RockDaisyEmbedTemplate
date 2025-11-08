import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AppFilter, FilterType} from '../../shared/components/filter/models/filter';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AuthService, FiltersService} from '../../shared';
import {forkJoin } from 'rxjs';

@Component({
	selector: 'app-dashboard1-page',
	standalone: false,
	templateUrl: './dashboard1.component.html',
	styleUrls: ['./dashboard1.component.scss'],
})

export class Dashboard1Component implements OnInit {
	public API_URL = environment.apiUrl;
	public filters: AppFilter[];
	public views: SafeResourceUrl[] = [];
	public isInProgress: boolean;

	constructor(private authService: AuthService,
		private sanitizer: DomSanitizer, private filtersService: FiltersService) {
	}

	public onFiltersSubmitClick() {
		const serializedFilters = this.filtersService.serializeFilters(this.filters);

		if(serializedFilters) {
			this.refreshViews(serializedFilters);
		}
	}

	ngOnInit(): void {
		this.refreshViews('');
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
					defaultValue: {PlayerId: null, Email: 'Select Player...'},
					textField: 'Email',
					valueField: 'PlayerId',
					dataSourceId: 49,
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
					textField: 'Label',
					valueField: 'Id',
					dataSourceId: 13,
					data: [],
					source: [],
				},
				Value: []
			})
		];
	}

	private refreshViews(serializedFilters: string) {
		const clientViewIds = ['pregame-report', 'scouting-pregame-report', '2aa0238d9c274db']; // test: ['c20e1498a367441', 'test-first-saved-dashboard-2', 'gps-daily-average-vs-game-demands'];

		this.isInProgress = true;
		this.views = [];

		forkJoin(clientViewIds.map(() => this.authService.getUserLoginLink()))
			.subscribe((tokenResponses) => {
				// eslint-disable-next-line @stylistic/max-len
				this.views = tokenResponses.map((token: Record<string, any>, i) => this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `/view/${clientViewIds[i]}?loginLink=${token.LinkToken}&filters=${serializedFilters}&hideHeaders=true&fullScreen={"hideHeaderLogo":true}`));
				this.isInProgress = false;
			});
	}
}

