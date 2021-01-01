import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HoldingAddEditModal } from '../shared/modals/holding-add-edit/holding-add-edit.modal';
import { HoldingDetailsModal } from '../shared/modals/holding-details/holding-details.modal';
import { Holding } from '../models/holding.model';
import { LoaderService } from '../core/services/loader.service';
import { AppConfig } from '../app.config';
import { ServerService } from '../core/services/server.service';
import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'app-holding',
  templateUrl: 'holding.page.html',
  styleUrls: ['holding.page.scss']
})
export class HoldingPage {

  holdingList: Holding[] = [];

  constructor(
    private _modalCtrl: ModalController,
    private _loader: LoaderService,
    private _ss: ServerService,
    private _ms: MessageService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {}

  ionViewDidEnter() {
    this._loadHolding();
  }

  async openAddEdit() {
    const modal = await this._modalCtrl.create({
      component: HoldingAddEditModal,
      cssClass: 'add-edit-modal'
    });
    modal.onDidDismiss().then((data: any) => {
      if (data['data'].reload) {
        this._loadHolding();
      }
    });
    return await modal.present();
  }

  async holdingDetail(id: number) {
    const modal = await this._modalCtrl.create({
      component: HoldingDetailsModal,
      componentProps: {
        'id': id
      },
      cssClass: 'add-edit-modal'
    });
    modal.onDidDismiss().then((data: any) => {
      if (data['data'].reload) {
        this._loadHolding();
      }
    });
    return await modal.present();
  }

  private _loadHolding(): void {
    this._loader.loadingPresent();
    this._ss.getData(AppConfig.API_SERVICE.HOLDING_LIST)
      .subscribe(
        holdingData => {
          this._ms.messageHandler(holdingData);
          this._loader.loadingDismiss();
          if (holdingData.status === 'success') {
            this.holdingList = holdingData.data.holding_list as Holding[];
          }
        },
        error => {
          this.holdingList = [];
          this._loader.loadingDismiss();
        }
      );
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ngOnDestroy() { }

}
