import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { ServerService } from './services/server.service';
import { ToastService } from './services/toast.service';
import { UtilService } from './services/util.service';

@NgModule({
  providers: [
    LoaderService,
    ToastService,
    UtilService,
    ServerService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}