import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { PayrollDetailApi } from '../response/payrolldetail/payrolldetail.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListPayrollDetailRequest } from '../requests/payrolldetail/list-payrolldetail.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PayrollDetailRequest } from '../requests/payrolldetail/payrolldetail.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PayrollDetailService {

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
  ): Observable<PayrollDetailApi> {

    const requestUrl = env.api + endpoint.LIST_PAYROLLDETAIL
    const params: ListPayrollDetailRequest = new ListPayrollDetailRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<PayrollDetailApi>(requestUrl, params).pipe(
      map((data: PayrollDetailApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.DetailId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  PayrollDetailRegister(payrolldetail: PayrollDetailRequest): Observable<ApiResponse> {
    const requestUrl = env.api+endpoint.PAYROLLDETAIL_REGISTER
    return this._http.post(requestUrl, payrolldetail ).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

}

