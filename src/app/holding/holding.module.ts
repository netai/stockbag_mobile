import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldingPage } from './holding.page';

import { HoldingPageRoutingModule } from './holding-routing.module';
import { HoldingService } from './services/holding.service';
import { FundService } from '../fund/services/fund.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    HoldingPageRoutingModule
  ],
  declarations: [
    HoldingPage
  ],
  entryComponents: [],
  providers: [
    HoldingService,
    FundService
  ]
})
export class HoldingPageModule {}
