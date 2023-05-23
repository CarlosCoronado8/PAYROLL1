import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './Payroll-routing.module';
import { PayrollListComponent } from './Payroll-list/Payroll-list.component';
import { SharedModule } from '@shared/shared.module';
import { PayrollManageComponent } from './Payroll-manage/Payroll-manage.component';


@NgModule({
  declarations: [
    PayrollListComponent,
    PayrollManageComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    SharedModule
  ]
})
export class PayrollModule { 
  
}
