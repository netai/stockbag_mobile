import { Component } from '@angular/core';
import { Fund } from '../models/fund.model';
import { LoaderService } from '../core/services/loader.service';
import { AppConfig } from '../app.config';
import { MessageService } from '../core/services/message.service';
import { ServerService } from '../core/services/server.service';

@Component({
  selector: 'app-fund',
  templateUrl: 'fund.page.html',
  styleUrls: ['fund.page.scss']
})
export class FundPage {

  fund: Fund;

  constructor(
    private _loader: LoaderService,
    private _ss: ServerService,
    private _ms: MessageService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {}

  ionViewDidEnter() {
    this._loadFund()
  }

  private _loadFund(): void {
    this._loader.loadingPresent();
    this._ss.getData(AppConfig.API_SERVICE.FUND)
      .subscribe(
        fundData => {
          this._ms.messageHandler(fundData);
          this._loader.loadingDismiss();
          if (fundData.status === 'success') {
            this.fund = fundData.data.fund as Fund;
          }
        },
        error => {
          this._loader.loadingDismiss();
        }
      );
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ngOnDestroy() { }

}