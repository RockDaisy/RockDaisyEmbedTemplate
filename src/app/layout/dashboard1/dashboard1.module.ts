import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Dashboard1RoutingModule} from './dashboard1-routing.module';
import {Dashboard1Component} from './dashboard1.component';
import {PanelBarModule} from "@progress/kendo-angular-layout";
import {FilterModule} from "../../shared/components/filter/filter.module";

@NgModule({
  imports: [
    CommonModule,
    Dashboard1RoutingModule,
    CommonModule,
    PanelBarModule,
    FilterModule
  ],
  declarations: [Dashboard1Component]
})
export class Dashboard1PageModule {
}
