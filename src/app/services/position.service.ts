import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { PositionApi } from '../response/position/position.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListPositionRequest } from '../requests/position/list-position.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PositionRequest } from '../requests/position/position.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

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
  ): Observable<PositionApi> {

    const requestUrl = env.api + endpoint.LIST_POSITION
    const params: ListPositionRequest = new ListPositionRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<PositionApi>(requestUrl, params).pipe(
      map((data: PositionApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.positionId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  PositionRegister(position: PositionRequest): Observable<ApiResponse> {
    const requestUrl = env.api+endpoint.POSITION_REGISTER
    return this._http.post(requestUrl, position ).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }
  getPosition(positionId: number): Observable<PositionRequest> {
    const requestUrl = env.api+endpoint.POSITION_BY_ID+positionId; // Ajusta la URL según tu API
    return this._http.get<PositionRequest>(requestUrl);
  }


}

