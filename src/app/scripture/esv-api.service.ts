import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AppConfig from '../../app.config.json';

import { ApiService, ApiParameter } from '../api.service';

@Injectable()
export class EsvApiService extends ApiService<EsvResponse> {

  // TODO create s sibling component to use this random verse 
  // http://labs.bible.org/api_web_service
  constructor(protected _http:HttpClient) {
    super(_http);
    this.baseUrl = 'https://api.esv.org/v3/passage/text';
  }
  // curl -X GET --header 'Accept: application/json' --header 'Authorization: Token a697d4dffc19086b3d432ad620a8eb0886ef97b2' 'https://api.esv.org/v3/passage/text/?q=01001001-01011032'



  getScripture() {
    let params: ApiParameter[] = [];
    let headers: ApiParameter[] = [];

    headers.push(new ApiParameter('Accept', 'application/json'));
    headers.push(new ApiParameter('Authorization', AppConfig['esv_api_key']));

    params.push(new ApiParameter('q','01001001-01011032'));

    this.callApi(params, headers);

  }

  apiCallSuccess(response:EsvResponse) {
    console.log(response);
  }
}

interface EsvResponse {

}
