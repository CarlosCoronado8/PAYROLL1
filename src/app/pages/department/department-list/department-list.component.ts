import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { DepartmentApi } from 'src/app/response/department/department.response';
import { DepartmentService } from 'src/app/services/department.service';
import { DepartmentManageComponent } from '../department-manage/department-manage.component';
import { componentSettings } from './department-list-config';

@Component({
  selector: 'vex-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class DepartmentListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _DepartmentService: DepartmentService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Department')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  rowClick(e: any) {
    let action = e.action
    let department = e.rowClick

    switch (action) {
      case "edit":
        this.DepartmentEdit(department)
        break
      case "remove":
        this.DepartmentRemove(department)
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
    this._dialog.open(DepartmentManageComponent, {
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
  DepartmentEdit(row: DepartmentApi) {

  }
  DepartmentRemove(Department: any) {

  }
}
