import {ElementRef, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
} from './shared/';
import {NgIdleModule} from '@ng-idle/core';
import {PanelBarModule} from '@progress/kendo-angular-layout';
import {PopupModule} from '@progress/kendo-angular-popup';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {NOTIFICATION_CONTAINER, NotificationModule} from '@progress/kendo-angular-notification';
import {MenuModule} from '@progress/kendo-angular-menu';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import {FilterModule} from './shared/components/filter/filter.module';
import {LabelModule} from '@progress/kendo-angular-label';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from './interceptors/error.interceptor';
import {SVGIconComponent} from '@progress/kendo-angular-icons';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		MenuModule,

		SVGIconComponent,
		FormsModule,
		AppRoutingModule,
		NgIdleModule.forRoot(),
		LabelModule,
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
		{provide: NOTIFICATION_CONTAINER, useFactory: () => ({nativeElement: document.body} as ElementRef)},
		provideHttpClient(withInterceptors([errorInterceptor])),
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
