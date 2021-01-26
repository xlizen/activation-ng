import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './list/list.component';
import { OrderListViewComponent } from './list/view/view.component';

const routes: Routes = [
  {
    path: 'list',
    component: OrderListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
