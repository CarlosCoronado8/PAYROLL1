import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { PositionService } from 'src/app/services/position.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-position-manage',
  templateUrl: './position-manage.component.html',
  styleUrls: ['./position-manage.component.scss']
})
export class PositionManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _positionService: PositionService,
    private _dialogRef: MatDialogRef<PositionManageComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      positionId: [0, [Validators.required]],
      positionName: ['', [Validators.required]],
    });
  }

  PositionSave(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
      return;
  }

    const positionId = this.form.get('positionId').value;
    console.log(this.form.get('positionId').value);
    this.PositionRegister()
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

  PositionRegister(): void {
    console.log('REGISTER');
    this._positionService.PositionRegister(this.form.value).subscribe((resp) => {
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

  PositionEdit(PositionId: number): void {
    // Implement your edit logic here
  }
}
