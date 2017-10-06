import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AppConfig from '../../app.config.json';

import { ApiService, ApiParameter } from '../api.service';

@Injectable()
export class NetApiService extends ApiService<NetResponse> {

  // TODO create s sibling component to use this random verse
  // http://labs.bible.org/api_web_service
  constructor(protected _http:HttpClient) {
    super(_http);

    // Hack to get around CORS problem
    // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    // https://cors-anywhere.herokuapp.com/
    // http://www.ourmanna.com/verses/api/
    this.baseUrl = 'https://cors-anywhere.herokuapp.com/https://beta.ourmanna.com/api/v1/get/';
  }

  getScripture() {
    let params: ApiParameter[] = [];
    let headers: ApiParameter[] = [];

    // headers.push(new ApiParameter('Accept', 'application/json'));

    params.push(new ApiParameter('format','json'));
    params.push(new ApiParameter('order','random'));

    this.callApi(params, headers);

  }

  apiCallSuccess(response:NetResponse) {
    console.log(response);
  }
}

interface NetResponse {

}