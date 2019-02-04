import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {HeaderComponent} from '../shared';
import {FormsModule} from '@angular/forms';
import {PopupModule} from '@progress/kendo-angular-popup';
import {MenuModule} from '@progress/kendo-angular-menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
    PopupModule,
    MenuModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent
  ]
})
export class LayoutModule {
}
