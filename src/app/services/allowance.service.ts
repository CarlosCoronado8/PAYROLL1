import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { AllowanceApi } from '../response/allowance/allowance.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListAllowanceRequest } from '../requests/allowance/list-allowance.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AllowanceRequest } from '../requests/allowance/allowance.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {

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
  ): Observable<AllowanceApi> {

    const requestUrl = env.api + endpoint.LIST_ALLOWANCE
    const params: ListAllowanceRequest = new ListAllowanceRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<AllowanceApi>(requestUrl, params).pipe(
      map((data: AllowanceApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.allowanceId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  AllowanceRegister(allowance: AllowanceRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.ALLOWANCE_REGISTER
    return this._http.post(requestUrl, allowance ).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

}

