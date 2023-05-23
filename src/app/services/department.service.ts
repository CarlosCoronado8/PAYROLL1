import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { DepartmentApi } from '../response/department/department.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListDepartmentRequest } from '../requests/department/list-department.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DepartmentRequest } from '../requests/department/department.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private _http: HttpClient,
    private _alert: AlertService
  ) { }

  GetAll(
    size,
    sort,
    order,
    page,
    getInputs
  ): Observable<DepartmentApi> {

    const requestUrl = env.api + endpoint.LIST_DEPARTMENT
    const params: ListDepartmentRequest = new ListDepartmentRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<DepartmentApi>(requestUrl, params).pipe(
      map((data: DepartmentApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.DepartmentId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  DepartmentRegister(department: DepartmentRequest): Observable<ApiResponse> {
    const requestUrl = env.api+endpoint.DEPARTMENT_REGISTER
    return this._http.post(requestUrl, department ).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

}

