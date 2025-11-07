import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {CommonModule} from '@angular/common';
import {PanelBarModule} from '@progress/kendo-angular-layout';
import {FilterModule} from '../../shared/components/filter/filter.module';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {LabelModule} from '@progress/kendo-angular-label';
import {ButtonModule} from '@progress/kendo-angular-buttons';

@NgModule({
	imports: [
		HomeRoutingModule,
		CommonModule,
		PanelBarModule,
		InputsModule,
		LabelModule,
		ButtonModule,
		FilterModule
	],
	declarations: [HomeComponent]
})
export class HomeModule {
}
