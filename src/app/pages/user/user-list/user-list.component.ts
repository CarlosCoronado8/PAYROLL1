import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { UserApi } from 'src/app/response/user/user.response';
import { UserService } from 'src/app/services/user.service';
import { UserManageComponent } from '../user-manage/user-manage.component';
import { componentSettings } from './user-list-config';

@Component({
  selector: 'vex-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class UserListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _UserService: UserService,
    public _dialog: MatDialog
  ) {
    customTitle.set('User')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  rowClick(e: any) {
    let action = e.action
    let user = e.rowClick

    switch (action) {
      case "edit":
        this.UserEdit(user)
        break
      case "remove":
        this.UserRemove(user)
        break
    }
    return false
  }


  setData(data: any = null) {
    this.component.filters.stateFilter = data.value
    this.component.menuOpen = false
    this.formatGetInputs()
  }
  search(data: any) {
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchString
    this.formatGetInputs()
  }

  formatGetInputs() {
    let inputs = {
      numFilter: 0,
      textFilter: "",
      stateFilter: null
    }
    if (this.component.filters.numFilter != "") {
      inputs.numFilter = this.component.filters.numFilter
      inputs.textFilter = this.component.filters.textFilter
    }
    if (this.component.filters.stateFilter != null) {
      inputs.stateFilter = this.component.filters.stateFilter
    }
    this.component.getInputs = inputs

  }
  openDialogRegister() {
    this._dialog.open(UserManageComponent, {
      disableClose: true,
      width: '600px'
    }).afterClosed().subscribe(
      (res) => {
        if(res){
          this.formatGetInputs()
        }
      }
    )

  }
  UserEdit(row: UserApi) {

  }
  UserRemove(user: any) {

  }
}
