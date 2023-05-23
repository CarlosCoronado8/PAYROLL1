import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { DeductionService } from 'src/app/services/deduction.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-deduction-manage',
  templateUrl: './deduction-manage.component.html',
  styleUrls: ['./deduction-manage.component.scss']
})
export class DeductionManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void{
    this.form = this._fb.group({
      DeductionId: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      AMOUNT: ['', [Validators.required]],

    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _deductionService: DeductionService,
    private _dialogRef: MatDialogRef<DeductionManageComponent>
  ) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  DeductionSave(): void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const DeductionId = this.form.get('DeductionId').value

    if(DeductionId>0){
      this.DeductionEdit(DeductionId)
    }else{
      this.DeductionRegister()
    }
  }

  DeductionRegister():void{
    this._deductionService.deductionRegister(this.form.value).subscribe((resp) => {
      if(resp.isSuccess){
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      }else{
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  DeductionEdit(DeductionId: number): void{

  }

}

