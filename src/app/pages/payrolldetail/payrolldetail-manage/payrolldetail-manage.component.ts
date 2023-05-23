import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { PayrollDetailService } from 'src/app/services/payrolldetail.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-payrolldetail-manage',
  templateUrl: './payrolldetail-manage.component.html',
  styleUrls: ['./payrolldetail-manage.component.scss']
})
export class PayrollDetailManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void{
    this.form = this._fb.group({
      DetailId: ['', [Validators.required]],
      PayrollId: ['', [Validators.required]],
      ConceptId: ['', [Validators.required]],
      ConceptType: ['', [Validators.required]],
      Amount: ['', [Validators.required]],
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _payrolldetailService: PayrollDetailService,
    private _dialogRef: MatDialogRef<PayrollDetailManageComponent>
  ) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  PayrollDetailSave(): void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const PayrollDetailId = this.form.get('PayrollDetailId').value

    if(PayrollDetailId>0){
      this.PayrollDetailEdit(PayrollDetailId)
    }else{
      this.PayrollDetailRegister()
    }
  }

  PayrollDetailRegister():void{
    this._payrolldetailService.PayrollDetailRegister(this.form.value).subscribe((resp) => {
      if(resp.isSuccess){
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      }else{
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  PayrollDetailEdit(PayrollDetailId: number): void{

  }

}

