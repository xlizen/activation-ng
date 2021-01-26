import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { PassportModule } from './passport/passport.module';
// passport pages
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Type<void>[] = [DashboardComponent];
const COMPONENTS_NOROUNT: Type<void>[] = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, PassportModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class RoutesModule {}
