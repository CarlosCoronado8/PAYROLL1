import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { PayrollService } from 'src/app/services/Payroll.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-Payroll-manage',
  templateUrl: './Payroll-manage.component.html',
  styleUrls: ['./Payroll-manage.component.scss']
})
export class PayrollManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void{
    this.form = this._fb.group({
      PayrollId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]], 
      periodStart: ['', [Validators.required]],
      periodEnd: ['', [Validators.required]],
      totalEarned: ['', [Validators.required]],
      totalDeducted: ['', [Validators.required]],
      totalToPay: ['', [Validators.required]],


    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _PayrollService: PayrollService,
    private _dialogRef: MatDialogRef<PayrollManageComponent>
  ) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  PayrollSave(): void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const PayrollId = this.form.get('PayrollId').value

    if(PayrollId>0){
      this.PayrollEdit(PayrollId)
    }else{
      this.PayrollRegister()
    }
  }

  PayrollRegister():void{
    this._PayrollService.PayrollRegister(this.form.value).subscribe((resp) => {
      if(resp.isSuccess){
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      }else{
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  PayrollEdit(PayrollId: number): void{

  }

}

