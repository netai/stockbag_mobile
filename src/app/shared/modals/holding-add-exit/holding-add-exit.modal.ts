import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Holding } from 'src/app/models/holding.model';
import { MessageService } from 'src/app/core/services/message.service';
import { ServerService } from 'src/app/core/services/server.service';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-holding-add-exit-modal',
  templateUrl: './holding-add-exit.modal.html',
  styleUrls: ['./holding-add-exit.modal.scss'],
})
export class HoldingAddExitModal implements OnInit {

  @Input() action: string;
  @Input() holding: Holding;
  addExitFrm: FormGroup;
  isSubmitted: boolean = false;

  get formControls() { return this.addExitFrm.controls; }

  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _loader: LoaderService,
    private _ms: MessageService,
    private _ss: ServerService
  ) { }

  ngOnInit() {
    this.addExitFrm = this._fb.group({
      avg_price: ['', Validators.required],
      qty: ['', Validators.required],
      note: ['']
    });
  }

  public save(type: string): void {
    this.isSubmitted = true;
    if (this.addExitFrm.valid && this._validData()) {
      this._loader.loadingPresent();
      let formData = this.addExitFrm.getRawValue();
      formData['id'] = this.holding.id;
      formData['req_type'] = this.action;
      this._ss.putData(AppConfig.API_SERVICE.HOLDING_ADD_EXIT, formData)
        .subscribe(
          resp => {
            this._ms.messageHandler(resp);
            this._loader.loadingDismiss();
            if (resp.status === 'success') {
              if (parseInt(formData['qty']) == this.holding.qty && this.action == 'exit') {
                this.close({ reload: true, parentClose: true });
              } else {
                this.close({ reload: true, parentClose: false });
              }
            }
          },
          error => {
            this._loader.loadingDismiss();
          }
        );
    }
  }

  private _validData(): boolean {
    let isValid = true;
    if (this.formControls.qty.value !== '' && parseInt(this.formControls.qty.value) > this.holding.qty && this.action == 'exit') {
      this._ms.messageHandler({ status: 'failure', message: 'Exit quantity should smaller than or equal to holding quantity' });
      isValid = false;
    }
    return isValid;
  }

  close(option = { reload: false, parentClose: false }) {
    this._modalCtrl.dismiss({
      'dismissed': true,
      'reload': option.reload,
      'parentClose': option.parentClose
    });
  }
}
