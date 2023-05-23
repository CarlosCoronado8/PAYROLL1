import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { AllowanceService } from 'src/app/services/allowance.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-allowance-manage',
  templateUrl: './allowance-manage.component.html',
  styleUrls: ['./allowance-manage.component.scss']
})
export class AllowanceManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void{
    this.form = this._fb.group({
      AllowanceId: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      AMOUNT: ['', [Validators.required]],

    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _allowanceService: AllowanceService,
    private _dialogRef: MatDialogRef<AllowanceManageComponent>
  ) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  AllowanceSave(): void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const allowanceId = this.form.get('AllowanceId').value

    if(allowanceId>0){
      this.AllowanceEdit(allowanceId)
    }else{
      this.AllowanceRegister()
    }
  }

  AllowanceRegister():void{
    this._allowanceService.AllowanceRegister(this.form.value).subscribe((resp) => {
      if(resp.isSuccess){
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      }else{
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  AllowanceEdit(allowanceId: number): void{

  }

}

