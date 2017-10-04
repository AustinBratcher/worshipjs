import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MdButtonModule } from '@angular/material';


import { AppComponent } from './app.component';
import { RgbaComponent } from './rgba-coordinator/rgba/rgba.component';
import { RgbaCoordinatorComponent } from './rgba-coordinator/rgba-coordinator.component';
import { ScriptureComponent } from './scripture/scripture.component';

import { WeatherApiService } from './weather-api.service';
import { StockApiService } from './stock-api.service';
import { EsvApiService } from './scripture/esv-api.service';


@NgModule({
  declarations: [
    AppComponent,
    RgbaComponent,
    RgbaCoordinatorComponent,
    ScriptureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MdButtonModule
  ],
  providers: [EsvApiService,  WeatherApiService, StockApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
