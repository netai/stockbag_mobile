import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { LoaderService } from '../core/services/loader.service';
import { MessageService } from '../core/services/message.service';
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settingsFrm: FormGroup;
  isSubmitted: boolean = false;
  userData: any;
  trade_period: any;
  get formControls() { return this.settingsFrm.controls; }

  constructor(
    private _location: Location,
    private _fb: FormBuilder,
    private _as: AuthService,
    private _loader: LoaderService,
    private _ms: MessageService,
  ) {
    this.userData = _as.getUserData().user;
    if (localStorage.getItem('TRADE_PERIOD')) {
      this.trade_period = JSON.parse(localStorage.getItem('TRADE_PERIOD'));
    } else {
      this.trade_period = AppConfig.TRADE_CONFIG.PERIOd;
    }
  }

  ngOnInit() {
    this.settingsFrm = this._fb.group({
      short_return: [this.trade_period['S'].return, [Validators.required, Validators.min(.1)]],
      middle_return: [this.trade_period['M'].return, [Validators.required, Validators.min(.1)]],
      long_return: [this.trade_period['L'].return, [Validators.required, Validators.min(.1)]]
    });
  }

  goBack() {
    this._location.back();
  }

  save() {
    this.isSubmitted = true;
    if (this.settingsFrm.valid) {
      this._loader.loadingPresent();
      let data = this.settingsFrm.getRawValue();
      this.trade_period['S'].return = data.short_return;
      this.trade_period['M'].return = data.middle_return;
      this.trade_period['L'].return = data.long_return;
      localStorage.setItem('TRADE_PERIOD', JSON.stringify(this.trade_period));
      setTimeout(() => {
        this._loader.loadingDismiss();
        this._ms.messageHandler({ status: 'success', message: 'Setting saved successfully.' });
      }, 500);
      this.isSubmitted = false;
    }
  }

}
