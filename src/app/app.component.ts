// Angular/3rd Party imports
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatSidenavModule} from '@angular/material';

// General Component/App imports
import { NavItem } from './nav-item';
import { WeatherApiService } from './weather-api.service';
// import { EsvApiService } from './scripture/esv-api.service';
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
    new NavItem("About", "group_work", "/about")
    // new NavItem("Thoughts", "library_books", "/thoughts"),
    // new NavItem("Settings", "settings", "/settings"),
  ];

  constructor(private _bibleApi: NetApiService, private _weatherApi: WeatherApiService, private _stockApi: StockApiService) {}

  ngOnInit() {}

}
