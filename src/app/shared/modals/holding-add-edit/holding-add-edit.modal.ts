import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UtilService } from 'src/app/core/services/util.service';
import { AppConfig } from 'src/app/app.config';
import { Holding } from 'src/app/models/holding.model';
import { ServerService } from 'src/app/core/services/server.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-holding-add-edit-modal',
  templateUrl: './holding-add-edit.modal.html',
  styleUrls: ['./holding-add-edit.modal.scss'],
})
export class HoldingAddEditModal implements OnInit {

  @Input() holding: Holding;
  addEditFrm: FormGroup;
  isSubmitted: boolean = false;
  trade_period: any;

  get formControls() { return this.addEditFrm.controls; }

  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _loader: LoaderService,
    private _ss: ServerService,
    private _ms: MessageService
  ) {
    if(localStorage.getItem('TRADE_PERIOD')) {
      this.trade_period = JSON.parse(localStorage.getItem('TRADE_PERIOD'));
    } else {
      this.trade_period = AppConfig.TRADE_CONFIG.PERIOd;
    }
  }

  ngOnInit() {
    this.addEditFrm = this._fb.group({
      exchange: [(this.holding ? this.holding.exchange : 'NSE'), Validators.required],
      symbol: [(this.holding ? this.holding.symbol : ''), Validators.required],
      avg_price: [(this.holding ? this.holding.avg_price : ''), Validators.required],
      target_price: [(this.holding ? this.holding.target_price : ''), Validators.required],
      profit_percentage: ['', Validators.required],
      qty: [(this.holding ? this.holding.qty : ''), Validators.required],
      period: [(this.holding ? this.holding.period : 'S'), Validators.required],
      est_exit_date: [(this.holding ? this.holding.est_exit_date : UtilService.getAddedDaysDate((new Date).toString(), 7)), Validators.required],
      note: ['']
    });
    this.setProfitPercentage();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  public save(type: string): void {
    this.isSubmitted = true;
    if (this.addEditFrm.valid) {
      this._loader.loadingPresent();
      let formData = this._formatValue(this.addEditFrm.getRawValue());
      formData['holding_type'] = type;
      if (this.holding) {
        formData['id'] = this.holding.id;
        this._ss.putData(AppConfig.API_SERVICE.HOLDING, formData)
          .subscribe(
            resp => {
              this._ms.messageHandler(resp);
              this._loader.loadingDismiss();
              if(resp.status === 'success') {
                this.close(true);
              }
            },
            error => {
              this._loader.loadingDismiss();
            }
          );
      } else {
        this._ss.postData(AppConfig.API_SERVICE.HOLDING, formData)
          .subscribe(
            resp => {
              this._ms.messageHandler(resp);
              this._loader.loadingDismiss();
              if(resp.status === 'success') {
                this.close(true);
              }
            },
            error => {
              this._loader.loadingDismiss();
            }
          );
      }
    }
  }

  private _formatValue(data: any): any {
    data['est_exit_date'] = data['est_exit_date'].split('T')[0];
    return data;
  }

  periodChanged(): void {
    this.addEditFrm.patchValue({
      'est_exit_date': UtilService.getAddedDaysDate((new Date).toString(), this.trade_period[this.addEditFrm.get('period').value].days)
    });
    this.setTargetPrice();
  }

  setTargetPrice(): void {
    let avg_price = parseFloat(this.addEditFrm.get('avg_price').value);
    let qty = parseInt(this.addEditFrm.get('qty').value);
    let target_per = this.trade_period[this.addEditFrm.get('period').value].return;
    if (!isNaN(avg_price)) {
      let target_price = (((avg_price / 100) * target_per) + avg_price).toFixed(2);
      if (!isNaN(qty)) {
        target_price = (parseFloat(target_price) + (AppConfig.TRADE_CONFIG.EXTRA_CHARGES / qty)).toFixed(2);
      }
      this.addEditFrm.patchValue({
        'target_price': target_price
      });
    }
    this.setProfitPercentage();
  }

  setProfitPercentage(): void {
    let avg_price = parseFloat(this.addEditFrm.get('avg_price').value);
    let target_price = parseFloat(this.addEditFrm.get('target_price').value);
    if (!isNaN(avg_price) && !isNaN(target_price)) {
      let profit_percentage = ((target_price - avg_price) * 100 / avg_price).toFixed(2);

      this.addEditFrm.patchValue({
        'profit_percentage': profit_percentage
      });
    }
  }

  setTargetPriceByPercentage(): void {
    let profit_percentage = parseFloat(this.addEditFrm.get('profit_percentage').value);
    let avg_price = parseFloat(this.addEditFrm.get('avg_price').value);
    if (!isNaN(avg_price) && !isNaN(profit_percentage)) {
      let target_price = (((avg_price / 100) * profit_percentage + avg_price)).toFixed(2);
      this.addEditFrm.patchValue({
        'target_price': target_price
      });
    }
  }

  close(reload: boolean) {
    this._modalCtrl.dismiss({
      'dismissed': true,
      'reload': reload
    });
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ngOnDestroy() { }
}
