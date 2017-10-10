import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {MatSidenavModule} from '@angular/material';

import { NavItem } from './nav-item';

import { RgbaCoordinatorComponent } from './rgba-coordinator/rgba-coordinator.component';
import { WeatherApiService } from './weather-api.service';
import { EsvApiService } from './scripture/esv-api.service';
import { NetApiService } from './scripture/net-api.service';
import { StockApiService } from './stock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WorshipJS';

  navItems = [
    new NavItem("Home", "home", "/home"),
    new NavItem("About", "group_work", "/about"),
    new NavItem("Thoughts", "library_books", "/thoughts"),
    new NavItem("Settings", "settings", "/settings"),
  ];

  constructor(private _bibleApi: NetApiService, private _weatherApi: WeatherApiService, private _stockApi: StockApiService) {

  }

  ngOnInit() {

  }

  // TODO remove
  getWeather() {
    this._weatherApi.getWeatherFromApi();
  }

  // TODO remove
  getScripture() {
    this._bibleApi.getScriptureFromApi();
  }

  // TODO remove
  getStocks() {
    this._stockApi.getStocksFromApi();
  }

}
