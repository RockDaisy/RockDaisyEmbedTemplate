import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, User} from '../../services';

@Component({
  selector: 'app-header',
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
        path: '', text: 'Options', icon: 'gear', cssClass: 'desktop-visible menu-options', items: [
          {path: 'user', text: 'USER SETTINGS'},
          {path: 'login', text: 'SIGN OUT'},
        ],
      },

      {
        path: '', text: '', icon: 'menu', cssClass: 'mobile-visible menu-options', items: [
          {path: 'dashboard1', text: 'DASHBOARD 1'},
          {path: 'user', text: 'USER SETTINGS'},
          {path: 'login', text: 'SIGN OUT'},
        ],
      }
    ]
  }

  public onSelect({item}): void {
    if (item.path === 'login') {
      this.auth.signout(true);
    } else if (!item.items) {
      this.router.navigate([item.path]);
    }
  }
}
