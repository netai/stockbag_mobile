import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';
import { AuthService } from '../core/services/auth.service';
import { LoaderService } from '../core/services/loader.service';
import { MessageService } from '../core/services/message.service';
import { ServerService } from '../core/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFrm: FormGroup;
  isSubmitted: boolean = false;

  get formControls() { return this.loginFrm.controls; }

  constructor(
    private _fb: FormBuilder,
    private _loader: LoaderService,
    private _ss: ServerService,
    private _ms: MessageService,
    private _as: AuthService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.loginFrm = this._fb.group({
      username: ['', Validators.required]
    });
  }

  public login(): void {
    this.isSubmitted = true;
    if (this.loginFrm.valid) {
      this._loader.loadingPresent();
      let formData = this.loginFrm.getRawValue();
      this._ss.postData(AppConfig.API_SERVICE.LOGIN, formData)
        .subscribe(
          userData => {
            if (userData.status === 'success') {
              this._as.authenticate(userData.data);
              this._router.navigateByUrl('/');
            }
            this._ms.messageHandler(userData);
            this._loader.loadingDismiss();
          },
          error => {
            this._loader.loadingDismiss();
            this.isSubmitted = false;
          }
        );
    }
  }

}
