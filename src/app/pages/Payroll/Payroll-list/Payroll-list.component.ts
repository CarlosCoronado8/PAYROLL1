import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { PayrollApi } from 'src/app/response/Payroll/Payroll.response';
import { PayrollService } from 'src/app/services/Payroll.service';
import { PayrollManageComponent } from '../Payroll-manage/Payroll-manage.component';
import { componentSettings } from './Payroll-list-config';

@Component({
  selector: 'vex-Payroll-list',
  templateUrl: './Payroll-list.component.html',
  styleUrls: ['./Payroll-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class PayrollListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _Payrollservice: PayrollService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Payroll')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  rowClick(e: any) {
    let action = e.action
    let Payroll = e.rowClick

    switch (action) {
      case "edit":
        this.PayrollEdit(Payroll)
        break
      case "remove":
        this.PayrollRemove(Payroll)
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
    this._dialog.open(PayrollManageComponent, {
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
  PayrollEdit(row: PayrollApi) {

  }
  PayrollRemove(Payroll: any) {

  }
}
