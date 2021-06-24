import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConfig } from 'src/app/app.config';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-fund-add-withdraw',
  templateUrl: './fund-add-withdraw.modal.html',
  styleUrls: ['./fund-add-withdraw.modal.scss'],
})
export class FundAddWithdrawModal implements OnInit {

  @Input() action: string;
  isSubmitted: boolean = false;
  amount: string = '';

  constructor(
    private _modalCtrl: ModalController,
    private _loader: LoaderService,
    private _ms: MessageService,
    private _ss: ServerService
  ) { }

  ngOnInit() { }

  public save(type: string): void {
    this.isSubmitted = true;
    if (this.amount !== '') {
      this._loader.loadingPresent();
      if (parseFloat(this.amount) > 0) {
        let formData = {
          amount: this.amount,
          req_type: this.action
        };
        this._ss.putData(AppConfig.API_SERVICE.FUND_ADD_WITHDRAW, formData)
          .subscribe(
            resp => {
              this._ms.messageHandler(resp);
              this._loader.loadingDismiss();
              if (resp.status === 'success') {
                this.close(true);
              }
            },
            error => {
              this._loader.loadingDismiss();
            }
          );
      } else {
        setTimeout(() => {
          this._loader.loadingDismiss();
          this._ms.messageHandler({ status: 'failure', message: 'Please provide valid amount.' });
          this.close();
        }, 500);
      }
    }
  }

  close(reload: boolean = false) {
    this._modalCtrl.dismiss({
      'dismissed': true,
      'reload': reload
    });
  }

}
