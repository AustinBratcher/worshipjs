import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService, ApiParameter } from './api.service';

import * as AppConfig from '../app.config.json';

@Injectable()
export class StockApiService extends ApiService<StockResponse> {

  // https://www.alphavantage.co/documentation/
  private stockDetails: any;

  constructor(protected _http:HttpClient) {
    super(_http);
    this.baseUrl = 'https://www.alphavantage.co/query';
  }

  getStocksFromApi() {
    let params: ApiParameter[] = [];

    params.push(new ApiParameter('apikey', AppConfig['alpha_vantage_api_key']));
    params.push(new ApiParameter('function', 'TIME_SERIES_DAILY'));
    params.push(new ApiParameter('symbol', 'IXIC'));

    this.callApi(params);
  }

  apiCallSuccess(response:StockResponse) {
    let details = response['Time Series (Daily)'];
    this.stockDetails = details[Object.keys(details)[0]];
    this.next(this.stockDetails);
  }

}

interface StockResponse {

}
