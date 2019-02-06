import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services';
import {AppFilter} from "./models/filter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FilterComponent implements OnInit {
  @Input() filter: AppFilter;


  constructor(private dataService: DataService, public router: Router) {
  }

  ngOnInit() {
    if(this.filter.Options.dataSourceId) {
      this.dataService.getDataSourceData(this.filter.Options.dataSourceId)
        .subscribe((players: Array<any>) => {
          this.filter.Options.source = players;
          this.filter.Options.data = players;
        });
    }
  }

  public onDropDownFilterChange(value) {
    this.filter.Options.data = this.filter.Options.source.filter((s) => s[this.filter.Options.textField].toLowerCase().indexOf(value.toLowerCase()) !== -1)
  }
}
