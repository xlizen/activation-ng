import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareLogComponent } from './log/log.component';

const COMPONENTS: Type<void>[] = [SoftwareLogComponent];
const COMPONENTS_NOROUNT: Type<void>[] = [];

@NgModule({
  imports: [SharedModule, SoftwareRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class SoftwareModule {}
