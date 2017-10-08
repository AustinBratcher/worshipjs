import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/retry';

@Injectable()
export abstract class ApiService<T> extends Subject<T>  {

  private _baseUrl: string;
  private _retryCount: number = 2;

  constructor(protected _http: HttpClient) {
    super();
  }

  callApi(params:ApiParameter[], headers:ApiParameter[]=[]) {

    // TODO use regex to clean up baseUrl
    this._http.get<T>(this.baseUrl+'?'+this.buildParams(params), {
      headers: this.buildHeaders(headers)
    })
    .retry(3)
    .subscribe(
      data => {this.apiCallSuccess(data)}, // TODO find a better way to pass this to users besides a callback
      this.handleError
    );

  }

  // returns given array parameters as
  private buildParams(params:ApiParameter[]): string {
    let concatenatedParams: string = '';

    params.forEach(param => {
      if(concatenatedParams.length !== 0){
        concatenatedParams += '&';
      }
      concatenatedParams += `${param.key}=${param.value}`;
    });

    return concatenatedParams;
  }

  private buildHeaders(headers:ApiParameter[]):HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    headers.forEach((header)=>{
      httpHeaders = httpHeaders.set(header.key, header.value);
    });

    return httpHeaders;
  }

  public handleError(err: HttpErrorResponse) {
    if(err.error instanceof Error) {
      // Client side or network error
      console.log('An error occured:', err.error.message);
    }
    else {
      // API returned an unsuccessful response
      console.log(`API Error Code: ${err.status}, body was: \n ${err.error}`);
      console.log(err);
    }
  }

  abstract apiCallSuccess(response:T);

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  get retryCount() {
    return this._retryCount;
  }

  set retryCount(retryCount: number) {
    this._retryCount = retryCount;
  }


}

export class ApiParameter {
  constructor(public key:string, public value:string){}
}
