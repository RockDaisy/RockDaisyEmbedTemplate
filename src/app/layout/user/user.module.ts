import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputsModule} from '@progress/kendo-angular-inputs';

@NgModule({
	imports: [
		UserRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		InputsModule
	],
	declarations: [UserComponent]
})
export class UserModule {
}
