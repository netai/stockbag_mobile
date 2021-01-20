import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

  constructor(
    private _router: Router,
    private _popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  redirectTo(url: string): void {
    if (url === 'logout') {
      url = 'login'
    }
    this._router.navigateByUrl(url);
    this._popoverCtrl.dismiss();
  }

}
