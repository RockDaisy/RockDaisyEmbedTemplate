import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, User} from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuItems: any[];
  public user: User;
  public userPopupShown = false;

  constructor(private auth: AuthService, public router: Router) {
    this.user = auth.getUserInfo();
    this.menuItems = [
      { path: 'dashboard1', text: 'Dashboard 1' },
    ]
  }

  ngOnInit() {
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  onSignOut() {
    this.auth.signout(false);
  }

  public onSelect({ item }): void {
    if (!item.children) {
      this.router.navigate([ item.path ]);
    }
  }
}
