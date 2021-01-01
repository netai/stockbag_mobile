import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Holding } from 'src/app/models/holding.model';
import { Notes } from 'src/app/models/notes.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { HoldingAddEditModal } from '../holding-add-edit/holding-add-edit.modal';
import { HoldingAddExitModal } from '../holding-add-exit/holding-add-exit.modal';
import { AppConfig } from 'src/app/app.config';
import { MessageService } from 'src/app/core/services/message.service';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-holding-details-modal',
  templateUrl: './holding-details.modal.html',
  styleUrls: ['./holding-details.modal.scss'],
})
export class HoldingDetailsModal implements OnInit {

  @Input() id: any;
  holding: Holding;
  notes: Notes[] = [];
  period_detail = {
    'S': 'Short',
    'M': 'Middle',
    'L': 'Long'
  }
  newNote: string = '';
  reloadHoldingList: boolean = false;

  constructor(
    private _modalCtrl: ModalController,
    private _loader: LoaderService,
    private _alertCtrl: AlertController,
    private _ms: MessageService,
    private _ss: ServerService
  ) { }

  ngOnInit() {
    this._loadHolding();
  }

  public sendNote(): void {
    if (this.newNote.trim() !== '') {
      this._loader.loadingPresent();
      let formData = {
        'note': this.newNote
      }
      this._ss.postData(AppConfig.API_SERVICE.HOLDING_NOTE.replace('<holding_id>', this.id), formData)
        .subscribe(
          resp => {
            this._loader.loadingDismiss();
            this._ms.messageHandler(resp);
            if (resp.status === 'success') {
              this.newNote = '';
              this._loadNotes(this.holding.id);
            }
          },
          error => {
            this._loader.loadingDismiss();
          }
        );
    }
  }

  async modify() {
    const modal = await this._modalCtrl.create({
      component: HoldingAddEditModal,
      cssClass: 'add-edit-modal',
      componentProps: {
        'holding': this.holding
      }
    });
    modal.onDidDismiss().then((data: any) => {
      if (data['data'].reload) {
        this.reloadHoldingList = true;
        this._loadHolding();
      }
    });
    return await modal.present();
  }

  async deleteNote(id: number) {
    const alert = await this._alertCtrl.create({
      cssClass: 'alert',
      header: 'Confirm!',
      message: 'Are you sure you want to <b>Delete</b> this <b>Note</b>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn btn-blue',
          handler: (_) => { }
        }, {
          text: 'Okay',
          cssClass: 'btn btn-red',
          handler: (_) => {
            this._loader.loadingPresent();
            let formData = {
              'id': id
            };
            this._ss.deleteData(AppConfig.API_SERVICE.HOLDING_NOTE.replace('<holding_id>', this.id) + '/' + id)
              .subscribe(
                resp => {
                  this._ms.messageHandler(resp);
                  this._loader.loadingDismiss();
                  if (resp.status === 'success') {
                    this._loadNotes(this.id);
                  }
                },
                error => {
                  this._loader.loadingDismiss();
                }
              );
          }
        }
      ]
    });
    await alert.present();
  }

  async delete() {
    const alert = await this._alertCtrl.create({
      cssClass: 'alert',
      header: 'Confirm!',
      message: 'Are you sure you want to <b>Delete</b> this <b>Holding</b>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn btn-blue',
          handler: (_) => { }
        }, {
          text: 'Okay',
          cssClass: 'btn btn-red',
          handler: (_) => {
            this._loader.loadingPresent();
            this._ss.deleteData(AppConfig.API_SERVICE.HOLDING + '/' + this.holding.id)
              .subscribe(
                resp => {
                  this._ms.messageHandler(resp);
                  this._loader.loadingDismiss();
                  if (resp.status === 'success') {
                    this.reloadHoldingList = true;
                    this.close();
                  }
                },
                error => {
                  this._loader.loadingDismiss();
                }
              );
          }
        }
      ]
    });
    await alert.present();
  }

  async addExit(action: string) {
    const modal = await this._modalCtrl.create({
      component: HoldingAddExitModal,
      cssClass: 'modal-drawer add-exit-modal',
      componentProps: {
        'action': action,
        'holding': this.holding
      }
    });
    modal.onDidDismiss().then((data: any) => {
      setTimeout(() => {
        if (data['data'] && data['data'].parentClose) {
          this.reloadHoldingList = true;
          this.close()
        }
        else if (data['data'] && data['data'].reload) {
          this._loadHolding()
        }
      }, 10);
    });
    return await modal.present();
  }

  private _loadHolding(): void {
    this._loader.loadingPresent();
    this._ss.getData(AppConfig.API_SERVICE.HOLDING + '/' + this.id)
      .subscribe(
        holdingData => {
          this._ms.messageHandler(holdingData);
          this._loader.loadingDismiss();
          if (holdingData.status === 'success') {
            this.holding = holdingData.data.holding as Holding;
            this._loadNotes(this.id);
          }
        },
        error => {
          this._loader.loadingDismiss();
        }
      );
  }

  private _loadNotes(holding_id: any): void {
    this._loader.loadingPresent();
    this._ss.getData(AppConfig.API_SERVICE.HOLDING_NOTE.replace('<holding_id>', holding_id))
      .subscribe(
        noteData => {
          if (noteData.status === 'success') {
            this.notes = noteData.data.notes as Notes[];
          }
          this._ms.messageHandler(noteData);
          this._loader.loadingDismiss();
        },
        error => {
          this.notes = [];
          this._loader.loadingDismiss();
        }
      );
  }

  close() {
    this._modalCtrl.dismiss({
      'dismissed': true,
      'reload': this.reloadHoldingList
    });
  }
}
