import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async presentToast(option: any) {
    const toast = await this.toastController.create({
      message: option.message,
      position: (option.position?option.position:'bottom'),
      duration: (option.duration?option.duration:3000),
      cssClass: 'toast '+(option.class?option.class:'toast-error'),
    });
    toast.present();
  }
}
