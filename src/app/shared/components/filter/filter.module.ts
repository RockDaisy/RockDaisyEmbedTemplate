import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateInputsModule} from "@progress/kendo-angular-dateinputs";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {FormsModule} from "@angular/forms";
import {FilterComponent} from "./filter.component";

@NgModule({
  imports: [
    CommonModule,
    DateInputsModule,
    DropDownsModule,
    FormsModule,
  ],
  declarations: [ FilterComponent ],
  exports: [ FilterComponent ],
})
export class FilterModule { }
