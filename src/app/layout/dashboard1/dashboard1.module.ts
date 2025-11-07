import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Dashboard1RoutingModule} from './dashboard1-routing.module';
import {Dashboard1Component} from './dashboard1.component';
import {PanelBarModule} from '@progress/kendo-angular-layout';
import {FilterModule} from '../../shared/components/filter/filter.module';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {LabelModule} from '@progress/kendo-angular-label';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {AppProgressComponent} from '../../shared/components/app-progress/app-progress.component';

@NgModule({
	imports: [
		CommonModule,
		Dashboard1RoutingModule,
		PanelBarModule,
		InputsModule,
		LabelModule,
		ButtonModule,
		FilterModule,
		AppProgressComponent
	],
	declarations: [Dashboard1Component]
})
export class Dashboard1PageModule {
}
