import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _router: Router,
    private _toast: ToastService
  ) { }

  messageHandler(messages: any): void {
    let options: any;

    if (messages.message) {
      if (messages.status === 0) {
        options = this._notFoundErrorHandler(messages);
      }
      else if (messages.status === 401) {
        options = this._authErrorHandler(messages.error);
      }
      else if (messages.status === 400) {
        options = this._badRequestMsgHandler(messages.error)
      }
      else {
        options = this._otherErrorHandler(messages)
      }
      this._toast.presentToast(options);
    }
  }

  private _badRequestMsgHandler(messages: any): any {
    let msgStr = '';
    if (typeof messages.message === 'object') {
      Object.keys(messages.message).forEach((value) => {
        msgStr += value + ': ' + messages.message[value];
      });
    } else {
      msgStr = messages.message;
    }
    return {
      message: msgStr,
      position: 'top'
    };
  }

  private _authErrorHandler(messages): any {
    this._router.navigateByUrl('/login');
    return {
      message: messages.message,
      position: 'top'
    };
  }

  private _notFoundErrorHandler(messages: any): any {
    return {
      message: 'Unknown error has occurred, please check your internet connection.',
      position: 'middle'
    };
  }

  private _otherErrorHandler(messages: any): void {
    let opt: any;
    if (messages.status === 'failure') {
      opt = {
        message: messages.message,
        position: 'middle'
      };
    }
    else if (messages.status === 'info') {
      opt = {
        message: messages.message,
        position: 'bottom'
      };
    }
    else if (messages.status === 'warning') {
      opt = {
        message: messages.message,
        position: 'bottom'
      };
    }
    else {
      opt = {
        message: messages.message,
        position: 'top',
        class: 'toast-success'
      };
    }
    return opt;
  }
}
