import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {FormsModule} from '@angular/forms';
import {FilterComponent} from './filter.component';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {LabelModule} from '@progress/kendo-angular-label';

@NgModule({
	imports: [
		CommonModule,
		DateInputsModule,
		DropDownsModule,
		FormsModule,
		InputsModule,
		LabelModule,
	],
	declarations: [ FilterComponent ],
	exports: [ FilterComponent ],
})
export class FilterModule { }
