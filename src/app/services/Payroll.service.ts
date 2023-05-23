import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { PayrollApi } from '../response/Payroll/Payroll.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListPayrollRequest } from '../requests/Payroll/list-Payroll.resquest';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PayrollRequest } from '../requests/Payroll/Payroll.resquest';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

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
  ): Observable<PayrollApi> {

    const requestUrl = env.api + endpoint.LIST_PAYROLL
    const params: ListPayrollRequest = new ListPayrollRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<PayrollApi>(requestUrl, params).pipe(
      map((data: PayrollApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.PayrollId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  PayrollRegister(Payroll: PayrollRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.PAYROLL_REGISTER
    return this._http.post(requestUrl, Payroll ).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

}

