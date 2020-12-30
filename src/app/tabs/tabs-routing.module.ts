import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'holding',
        loadChildren: () => import('../holding/holding.module').then(m => m.HoldingPageModule)
      },
      {
        path: 'fund',
        loadChildren: () => import('../fund/fund.module').then(m => m.FundPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/holding',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/holding',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
