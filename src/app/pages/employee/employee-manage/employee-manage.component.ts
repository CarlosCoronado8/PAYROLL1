import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { EmployeeService } from 'src/app/services/employee.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void{
    this.form = this._fb.group({
      employeeId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      baseSalary: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      positionId: ['', [Validators.required]],
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmployeeManageComponent>
  ) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  EmployeeSave(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
      return;
    }
    const employeeId = this.form.get('employeeId').value;
    console.log(this.form.get('employeeId').value);
    this.EmployeeRegister()
    /*if (positionId > 0) {
      console.log('IF POSITION');
      console.log(this._positionService.getPosition(positionId));
      this._positionService.getPosition(positionId).subscribe((position) => {
        if (position) {
          this.PositionEdit(positionId);
        } else {
          this.PositionRegister();
        }
      });
    } else {
      this.PositionRegister();
    }*/

  }

  EmployeeRegister(): void {
    console.log('REGISTER');
    this._employeeService.EmployeeRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        console.log('GUARDAR');
        this._alert.success('Successfull', resp.message);
        this._dialogRef.close(true);
      } else {
        console.log('ERROR');
        this._alert.warn('Atention', resp.message);
      }
    });
  }

  EmployeeEdit(EmployeeId: number): void{

  }

}

