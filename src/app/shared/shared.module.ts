import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { FundAddWithdrawModal } from "./modals/fund-add-withdraw/fund-add-withdraw.modal";
import { HoldingAddEditModal } from "./modals/holding-add-edit/holding-add-edit.modal";
import { HoldingAddExitModal } from "./modals/holding-add-exit/holding-add-exit.modal";
import { HoldingDetailsModal } from "./modals/holding-details/holding-details.modal";
import { InrCurrencyPipe } from "./pipes/inr-currency.pipe";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
],
  declarations: [
    InrCurrencyPipe,
    HoldingAddEditModal,
    HoldingDetailsModal,
    HoldingAddExitModal,
    FundAddWithdrawModal
  ],
  entryComponents: [
    HoldingAddEditModal,
    HoldingDetailsModal,
    HoldingAddExitModal,
    FundAddWithdrawModal
  ],
  providers: [],
  exports: [
    InrCurrencyPipe
  ]
})
export class SharedModule {}
