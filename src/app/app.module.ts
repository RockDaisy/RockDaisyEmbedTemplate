import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  AuthService,
  Store,
  StoreHelper,
  ApiService,
  DataService
} from './shared/'
import {NgIdleModule} from '@ng-idle/core';
import {LayoutModule, PanelBarModule} from '@progress/kendo-angular-layout';
import {PopupModule} from '@progress/kendo-angular-popup';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {NotificationModule} from '@progress/kendo-angular-notification';
import {MenuModule} from '@progress/kendo-angular-menu';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import {FilterModule} from "./shared/components/filter/filter.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgIdleModule.forRoot(),

    LayoutModule,
    PanelBarModule,
    PopupModule,
    InputsModule,
    NotificationModule,
    MenuModule,
    DateInputsModule,
    DropDownsModule,
    FilterModule
  ],
  providers: [
    AuthService,
    DataService,
    Store,
    StoreHelper,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
