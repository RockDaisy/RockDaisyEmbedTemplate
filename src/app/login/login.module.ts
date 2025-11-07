import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {LabelModule} from '@progress/kendo-angular-label';
import {ButtonModule} from '@progress/kendo-angular-buttons';
import {AppProgressComponent} from '../shared/components/app-progress/app-progress.component';

@NgModule({
	imports: [
		CommonModule,
		LoginRoutingModule,
		FormsModule,
		InputsModule,
		LabelModule,
		ButtonModule,
		ReactiveFormsModule,
		AppProgressComponent
	],
	declarations: [LoginComponent]
})
export class LoginModule {
}
