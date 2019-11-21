import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {environment} from "../../../environments/environment";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {FiltersService, Store, StoreHelper} from "../../shared/services";
import {AppFilter, FilterType} from "../../shared/components/filter/models/filter";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition()],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  public API_URL = environment.apiUrl;
  public filters: Array<AppFilter>;
  public views: Array<SafeResourceUrl> = [];

  private refreshViews (serializedFilters: string){
    const token = this.store.getState()['LOGIN_LINK'];
    const loginLink = token && token[0] ? `/LoginLink=${token[0]}` : '';

    this.views = [
      this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `${loginLink}/view/757/${serializedFilters}//{ "hideHeaderLogo": true }`),
      this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `${loginLink}/view/758/${serializedFilters}//{ "hideHeaderLogo": true }`),
      this.sanitizer.bypassSecurityTrustResourceUrl(this.API_URL + `${loginLink}/view/759/${serializedFilters}//{ "hideHeaderLogo": true }`)
    ];

    if(loginLink) {
      this.storeHelper.update('LOGIN_LINK', null);
    }
  }

  constructor(private store: Store, private storeHelper: StoreHelper, private sanitizer: DomSanitizer, private filtersService: FiltersService) {
    this.refreshViews('');
  }

  public onFiltersSubmitClick(){
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
        Value: { start: null, end: null }
      }),

      new AppFilter({
        Type: FilterType.DropDown,
        Key: '@PlayerId',
        Label: 'Player',
        Options: {
          defaultValue: { PlayerId: null, PlayerFullName: 'Select Player...' },
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
}
