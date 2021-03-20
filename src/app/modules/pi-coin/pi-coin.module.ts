import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PiCoinRoutingModule } from './pi-coin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    PiCoinRoutingModule,
    SharedModule
  ]
})
export class PiCoinModule { }
