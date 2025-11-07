import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from './shared';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
		canActivate: [AuthService]
	},
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'not-found',
		loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
	},
	{path: '**', redirectTo: 'not-found'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
