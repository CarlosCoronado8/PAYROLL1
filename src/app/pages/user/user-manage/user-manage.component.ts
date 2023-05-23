import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import * as configs from '../../../../static-data/configs';

@Component({
  selector: 'vex-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  icClose = icClose
  configs = configs
  form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserManageComponent>
    ) {}

    ngOnInit(): void {
    this.initForm();
   }

   initForm(): void {
    this.form = this._fb.group({
      userId: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      createdAt: ['', [Validators.required]]
    });
  }

  UserSave(): void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
      return;
    }

    const userId = this.form.get('userId').value;
    console.log(this.form.get('userId').value);
    this.UserRegister()
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

  UserRegister():void{
    console.log('REGISTER');
    this._userService.UserRegister(this.form.value).subscribe((resp) => {
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

  UserEdit(UserId: number): void{

  }

}

