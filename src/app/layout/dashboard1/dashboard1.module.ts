import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Dashboard1RoutingModule} from './dashboard1-routing.module';
import {Dashboard1Component} from './dashboard1.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        Dashboard1RoutingModule,
        FormsModule
    ],
    declarations: [Dashboard1Component]
})
export class Dashboard1PageModule {
}
