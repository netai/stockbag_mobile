import { Component } from '@angular/core';
import { Fund } from '../models/fund.model';
import { LoaderService } from '../core/services/loader.service';
import { AppConfig } from '../app.config';
import { MessageService } from '../core/services/message.service';
import { ServerService } from '../core/services/server.service';
import { ModalController } from '@ionic/angular';
import { FundAddWithdrawModal } from '../shared/modals/fund-add-withdraw/fund-add-withdraw.modal';

@Component({
  selector: 'app-fund',
  templateUrl: 'fund.page.html',
  styleUrls: ['fund.page.scss']
})
export class FundPage {

  fund: Fund;
  profit_per: string = '';

  constructor(
    private _modalCtrl: ModalController,
    private _loader: LoaderService,
    private _ss: ServerService,
    private _ms: MessageService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

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
            this.profit_per = (((this.fund.total_amount + this.fund.unreleased_amount) - this.fund.invested_amount) * 100 / this.fund.invested_amount).toFixed(2)
          }
        },
        error => {
          this._loader.loadingDismiss();
        }
      );
  }

  async addWithdraw(action: string) {
    const modal = await this._modalCtrl.create({
      component: FundAddWithdrawModal,
      cssClass: 'modal-drawer drawer-sm add-withdraw-modal',
      componentProps: {
        'action': action
      }
    });
    modal.onDidDismiss().then((data: any) => {
      if (data['data'] && data['data'].reload) {
        this._loadFund()
      }
    });
    return await modal.present();
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ngOnDestroy() { }

}