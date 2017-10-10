// Angular/3rd party imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs/Rx';

// General Componenets and Services
import { Rgba } from './rgba/rgba';
import { RgbaComponent } from './rgba/rgba.component';

// Modifiers
import { ColorModifier } from './modifiers/color-modifier';
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
  //NOTE: This class could be eliminated and modifiers moved to the RgbaComponent
  // (with the RgbaComponent then subscribing to them itself). This would be more
  // streamlined, but would add responsibility to the RgbaComponent that might not
  // be necessary

  // main rgbaComponent
  @ViewChild('backgroundRgba')
  private rgbaComponent: RgbaComponent;

  private modifiers: ColorModifier[] = [];

  // NOTE: there has to be a better way to deal with the need for the HTTP client ot be
  // passed down through constructors;
  constructor(private _http:HttpClient) {}

  ngOnInit() {
    this.init();
  }

  // Initialization method
  init() {

    // Red modifiers
    this.modifiers.push(new CmGeolocation());
    this.modifiers.push(new CmScripture(this._http));
    this.modifiers.push(new CmTime());

    // Green Modifiers
    this.modifiers.push(new CmTOrientation());
    this.modifiers.push(new CmVOrientation());
    this.modifiers.push(new CmDevice());

    // Blue Modifiers
    this.modifiers.push(new CmWeather(this._http));
    this.modifiers.push(new CmStock(this._http));

    // subscribe to each modifier and initialize
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
    console.error(e);
  }

  // Method to comply with Observer interface
  complete() {

  }


}
