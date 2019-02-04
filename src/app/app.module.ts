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
import {LayoutModule} from '@progress/kendo-angular-layout';
import {PopupModule} from '@progress/kendo-angular-popup';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {NotificationModule} from '@progress/kendo-angular-notification';
import { MenuModule } from '@progress/kendo-angular-menu';

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
    PopupModule,
    InputsModule,
    NotificationModule,
    MenuModule
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
