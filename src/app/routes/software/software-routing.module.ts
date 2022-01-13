import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoftwareLogComponent } from './log/log.component';

const routes: Routes = [{ path: 'log', component: SoftwareLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoftwareRoutingModule {}
