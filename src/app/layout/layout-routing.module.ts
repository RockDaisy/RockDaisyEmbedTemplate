import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'dashboard1', loadChildren: './dashboard1/dashboard1.module#Dashboard1PageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
