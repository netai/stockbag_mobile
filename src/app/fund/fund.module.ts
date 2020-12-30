import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FundPage } from './fund.page';

import { FundPageRoutingModule } from './fund-routing.module';
import { FundService } from './services/fund.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    FundPageRoutingModule
  ],
  declarations: [
    FundPage
  ],
  providers: [
    FundService
  ]
})
export class FundPageModule {}
