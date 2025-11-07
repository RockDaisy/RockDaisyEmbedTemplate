import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
			{path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
			{path: 'dashboard1', loadChildren: () => import('./dashboard1/dashboard1.module').then(m => m.Dashboard1PageModule)},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule {
}
