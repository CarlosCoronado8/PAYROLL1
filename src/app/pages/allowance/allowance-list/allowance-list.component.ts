import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { AllowanceApi } from 'src/app/response/allowance/allowance.response';
import { AllowanceService } from 'src/app/services/allowance.service';
import { AllowanceManageComponent } from '../allowance-manage/allowance-manage.component';
import { componentSettings } from './allowance-list-config';

@Component({
  selector: 'vex-allowance-list',
  templateUrl: './allowance-list.component.html',
  styleUrls: ['./allowance-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class AllowanceListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _AllowanceService: AllowanceService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Allowance')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  rowClick(e: any) {
    let action = e.action
    let allowance = e.rowClick

    switch (action) {
      case "edit":
        this.AllowanceEdit(allowance)
        break
      case "remove":
        this.AllowanceRemove(allowance)
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
    this._dialog.open(AllowanceManageComponent, {
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
  AllowanceEdit(row: AllowanceApi) {

  }
  AllowanceRemove(Allowance: any) {

  }
}
