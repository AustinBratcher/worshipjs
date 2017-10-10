import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observer } from 'rxjs/Rx';

import { RgbaComponent } from './rgba/rgba.component';
import { Rgba } from './rgba/rgba';
import { ColorModifier } from './modifiers/color-modifier';

import { SettingsService } from '../settings/settings.service';

// Modifiers
import { CmTOrientation } from './modifiers/cm-t-orientation';
import { CmTime } from './modifiers/cm-time';
import { CmVOrientation } from './modifiers/cm-v-orientation';
import { CmDevice } from './modifiers/cm-device';
import { CmGeolocation } from './modifiers/cm-geolocation';
import { CmScripture } from './modifiers/cm-scripture';
import { CmWeather } from './modifiers/cm-weather';
import { CmStock } from './modifiers/cm-stock';


@Component({
  selector: 'app-rgba-coordinator',
  templateUrl: './rgba-coordinator.component.html',
  styleUrls: ['./rgba-coordinator.component.css']
})
export class RgbaCoordinatorComponent implements OnInit, Observer<Rgba>  {

  // Temp variable to view orientation
  private orientation = {
    alpha: 0,
    gamma: 0,
    beta: 0
  };

  @ViewChild('backgroundRgba')
  private rgbaComponent: RgbaComponent;

  private modifiers: ColorModifier[] = [];

  // TODO remove in final touches
  private cmtOrientation: CmTOrientation = new CmTOrientation(this._settings);


  // NOTE: there has to be a better way to deal with the need for the HTTP client ot be
  // passed down through constructors;
  constructor(private _http:HttpClient, private _settings:SettingsService) {}

  ngOnInit() {
    this.init();

    // Temp event listener to view orientation
    window.addEventListener("deviceorientation", (event)=>{
      event.alpha? this.orientation.alpha = event.alpha : this.orientation.alpha = -1;
      event.gamma? this.orientation.gamma = event.gamma : this.orientation.gamma = -1;
      event.beta? this.orientation.beta = event.beta : this.orientation.beta = -1;
      }, true);
  }
  
  init() {
    this.modifiers.push(new CmGeolocation(this._settings));
    this.modifiers.push(new CmScripture(this._http, this._settings));
    this.modifiers.push(new CmTime(this._settings));

    this.modifiers.push(new CmTOrientation(this._settings));
    this.modifiers.push(new CmVOrientation(this._settings));
    this.modifiers.push(new CmDevice(this._settings));

    this.modifiers.push(new CmWeather(this._http, this._settings));
    this.modifiers.push(new CmStock(this._http, this._settings));

    for(let modifier of this.modifiers) {
      modifier.subscribe(this);
      modifier.init();
    }
  }


  // Method to comply with Observer interface
  next(rgba: Rgba) {
    this.rgbaComponent.updateColors(rgba);
  }

  // Method to comply with Observer interface
  error(e) {

  }

  // Method to comply with Observer interface
  complete() {

  }


}
