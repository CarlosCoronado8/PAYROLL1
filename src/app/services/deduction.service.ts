import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { DeductionApi } from '../response/deduction/deduction.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListDeductionRequest } from '../requests/deduction/list-deduction.resquest';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DeductionRequest } from '../requests/deduction/deduction.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

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
  ): Observable<DeductionApi> {

    const requestUrl = env.api + endpoint.LIST_DEDUCTION
    const params: ListDeductionRequest = new ListDeductionRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<DeductionApi>(requestUrl, params).pipe(
      map((data: DeductionApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.DeductionId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  deductionRegister(deduction: DeductionRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.DEDUCTION_REGISTER
    return this._http.post(requestUrl, deduction ).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

}

