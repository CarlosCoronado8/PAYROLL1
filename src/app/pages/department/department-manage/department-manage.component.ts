import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { DepartmentService } from 'src/app/services/department.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-department-manage',
  templateUrl: './department-manage.component.html',
  styleUrls: ['./department-manage.component.scss']
})
export class DepartmentManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void{
    this.form = this._fb.group({
      DepartmentId: ['', [Validators.required]],
      Department: ['', [Validators.required]],
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _departmentService: DepartmentService,
    private _dialogRef: MatDialogRef<DepartmentManageComponent>
  ) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  DepartmentSave(): void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const DepartmentId = this.form.get('DepartmentId').value

    if(DepartmentId>0){
      this.DepartmentEdit(DepartmentId)
    }else{
      this.DepartmentRegister()
    }
  }

  DepartmentRegister():void{
    this._departmentService.DepartmentRegister(this.form.value).subscribe((resp) => {
      if(resp.isSuccess){
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      }else{
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  DepartmentEdit(DepartmentId: number): void{

  }

}

