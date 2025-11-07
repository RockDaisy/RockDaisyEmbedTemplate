import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../services/models/user';
import {AuthService} from '../../services/';

@Component({
	selector: 'app-header',
	standalone: false,
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
	public menuItems: any[];
	public user: User;

	constructor(private auth: AuthService, public router: Router) {
		this.user = auth.getUserInfo();
		this.menuItems = [
			{path: 'dashboard1', text: 'DASHBOARD 1', cssClass: 'desktop-visible'},
			{
				path: '', text: 'SETTINGS', cssClass: 'mobile-visible menu-options', items: [
					{path: 'dashboard1', text: 'DASHBOARD 1'},
					{path: 'user', text: 'USER SETTINGS'},
					{path: 'login', text: 'SIGN OUT'},
				],
			}
		];
	}

	public onSelect({item}: Record<string, any>): void {
		if (item.path === 'login') {
			this.auth.signOut(true);
		} else if (!item.items) {
			this.router.navigate([item.path]);
		}
	}
}
