import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {CommonModule} from '@angular/common';
import {PanelBarModule} from '@progress/kendo-angular-layout';
import {FilterModule} from "../../shared/components/filter/filter.module";

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    PanelBarModule,
    FilterModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
