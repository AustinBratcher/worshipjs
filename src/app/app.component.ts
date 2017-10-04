import { Component, OnInit} from '@angular/core';

import { RgbaCoordinatorComponent } from './rgba-coordinator/rgba-coordinator.component';
import { WeatherApiService } from './weather-api.service';
import { EsvApiService } from './scripture/esv-api.service';
import { StockApiService } from './stock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private _esvApi: EsvApiService, private _weatherApi: WeatherApiService, private _stockApi: StockApiService) {

  }

  ngOnInit() {

  }

  getWeather() {
    this._weatherApi.getWeather();
  }

  getScripture() {
    this._esvApi.getScripture();
  }

  getStocks() {
    this._stockApi.getStocks();
  }

}
