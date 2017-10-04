import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService, ApiParameter } from './api.service';

import * as AppConfig from '../app.config.json';

@Injectable()
export class StockApiService extends ApiService<StockResponse> {

  // https://www.alphavantage.co/documentation/

  constructor(protected _http:HttpClient) {
    super(_http);
    this.baseUrl = 'https://www.alphavantage.co/query';
  }

  getStocks() {
    let params: ApiParameter[] = [];

    params.push(new ApiParameter('apikey', AppConfig['alpha_vantage_api_key']));
    params.push(new ApiParameter('function', 'TIME_SERIES_INTRADAY'));
    params.push(new ApiParameter('symbol', 'MSFT'));
    params.push(new ApiParameter('interval', '60min'));

    this.callApi(params);
  }

  apiCallSuccess(response:StockResponse) {
    console.log(response);
  }

}

interface StockResponse {

}
