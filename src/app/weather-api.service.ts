// Angular/3rd Party imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//General Component/Class imports
import * as AppConfig from '../app.config.json';
import { ApiService, ApiParameter } from './api.service';

@Injectable()
export class WeatherApiService extends ApiService<WeatherResponse> {

  constructor(protected _http:HttpClient) {
    super(_http);
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  }

  getWeatherFromApi() {
    // Get Current position
    //NOTE: is there a way to do this without nesting the http call in a callback?
    navigator.geolocation.getCurrentPosition((position)=>{
      let params: ApiParameter[] = [];

      // add parameters for API call
      params.push(new ApiParameter('lat', '' + position.coords.latitude));
      params.push(new ApiParameter('lon', '' + position.coords.longitude));
      params.push(new ApiParameter('appid', AppConfig['openweather_api_key']));

      this.callApi(params);
    });
  }

  // Inherited & implemented callback method for successful api call
  apiCallSuccess(response:WeatherResponse) {
    this.next(response.main);
  }
}


export interface WeatherResponse {
  city: any;
  main: any;
  temperature: any;
  humidity: any;
  pressure: any;
  wind: any;
  clouds: any;
  visibility: any;
  precipitation: any;
  weather: any;
  lastupdate: any;
}
