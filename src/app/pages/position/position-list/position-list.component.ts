import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { PositionApi } from 'src/app/response/position/position.response';
import { PositionService } from 'src/app/services/position.service';
import { PositionManageComponent } from '../position-manage/position-manage.component';
import { componentSettings } from './position-list-config';

@Component({
  selector: 'vex-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class PositionListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _PositionService: PositionService,
    public _dialog: MatDialog
  ) {
    customTitle.set('positionName')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }

  rowClick(e: any) {
    let action = e.action
    let position = e.rowClick

    switch (action) {
      case "edit":
        this.PositionEdit(position)
        break
      case "remove":
        this.PositionRemove(position)
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
    this._dialog.open(PositionManageComponent, {
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
  PositionEdit(row: PositionApi) {

  }
  PositionRemove(Position: any) {

  }
}
