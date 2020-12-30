import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoldingPage } from './holding.page';

const routes: Routes = [
  {
    path: '',
    component: HoldingPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoldingPageRoutingModule {}
