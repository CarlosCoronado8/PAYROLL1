import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { EmployeeApi } from '../response/employee/employee.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListEmployeeRequest } from '../requests/employee/list-employee.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EmployeeRequest } from '../requests/employee/employee.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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
  ): Observable<EmployeeApi> {

    const requestUrl = env.api + endpoint.LIST_EMPLOYEE
    const params: ListEmployeeRequest = new ListEmployeeRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<EmployeeApi>(requestUrl, params).pipe(
      map((data: EmployeeApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.EmployeeId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  EmployeeRegister(employee: EmployeeRequest): Observable<ApiResponse> {
    const requestUrl = env.api+endpoint.EMPLOYEE_REGISTER
    return this._http.post(requestUrl, employee ).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

}

