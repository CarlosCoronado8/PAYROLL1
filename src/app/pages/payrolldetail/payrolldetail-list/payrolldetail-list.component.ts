import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { PayrollDetailApi } from 'src/app/response/payrolldetail/payrolldetail.response';
import { PayrollDetailService } from 'src/app/services/payrolldetail.service';
import { PayrollDetailManageComponent } from '../payrolldetail-manage/payrolldetail-manage.component';
import { componentSettings } from './payrolldetail-list-config';

@Component({
  selector: 'vex-payrolldetail-list',
  templateUrl: './payrolldetail-list.component.html',
  styleUrls: ['./payrolldetail-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class PayrollDetailListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _PayrollDetailService: PayrollDetailService,
    public _dialog: MatDialog
  ) {
    customTitle.set('PayrollDetail')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  rowClick(e: any) {
    let action = e.action
    let payrolldetail = e.rowClick

    switch (action) {
      case "edit":
        this.PayrollDetailEdit(payrolldetail)
        break
      case "remove":
        this.PayrollDetailRemove(payrolldetail)
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
    this._dialog.open(PayrollDetailManageComponent, {
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
  PayrollDetailEdit(row: PayrollDetailApi) {

  }
  PayrollDetailRemove(PayrollDetail: any) {

  }
}
