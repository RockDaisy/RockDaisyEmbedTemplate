import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AppFilter, FilterType} from '../../shared/components/filter/models/filter';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AuthService, FiltersService} from '../../shared';
import {forkJoin} from 'rxjs';

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
		private sanitizer: DomSanitizer, private filtersService: FiltersService) {}

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
		const clientViewIds = [757, 758, 759]; // anaducks: ['pregame-report', 'scouting-pregame-report', '2aa0238d9c274db'];

		this.isInProgress = true;
		this.views = [];
		forkJoin(clientViewIds.map(() => this.authService.getUserLoginLink()))
			.subscribe((tokenResponses) => {
				// eslint-disable-next-line @stylistic/max-len
				this.views = tokenResponses.map((token: Record<string, any>, i) =>  this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `/view/${clientViewIds[i]}?loginLink=${token.LinkToken}&filters=${serializedFilters}&fullScreen={"hideHeaderLogo":true}`));
				this.isInProgress = false;
			});
	}
}

