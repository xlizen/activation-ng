import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {UserListAddComponent} from './list/add/add.component';
import {UserListEditComponent} from './list/edit/edit.component';
import {UserListComponent} from './list/list.component';
import {UserListViewComponent} from './list/view/view.component';
import {UserRoutingModule} from './user-routing.module';

const COMPONENTS: Type<void>[] = [
  UserListComponent];
const COMPONENTS_NOROUNT: Type<void>[] = [
  UserListAddComponent,
  UserListEditComponent,
  UserListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
})
export class UserModule {
}
