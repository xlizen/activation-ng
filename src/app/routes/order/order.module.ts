import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { OrderListEditComponent } from './list/edit/edit.component';
import { OrderListComponent } from './list/list.component';
import { OrderListViewComponent } from './list/view/view.component';
import { OrderRoutingModule } from './order-routing.module';

const COMPONENTS: Type<void>[] = [OrderListComponent];
const COMPONENTS_NOROUNT: Type<void>[] = [OrderListEditComponent, OrderListViewComponent];

@NgModule({
  imports: [SharedModule, OrderRoutingModule, NzSpinModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class OrderModule {}
