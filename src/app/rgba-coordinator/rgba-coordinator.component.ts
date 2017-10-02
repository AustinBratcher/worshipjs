import { Component, OnInit } from '@angular/core';

import { Observer } from 'rxjs/Rx';

import { RgbaComponent } from './rgba/rgba.component';
import { Rgba } from './rgba/rgba';
import { ColorModifier } from './modifiers/color-modifier';

import { CmWeather } from './modifiers/cm-weather';
import { CmTOrientation } from './modifiers/cm-t-orientation';


@Component({
  selector: 'app-rgba-coordinator',
  templateUrl: './rgba-coordinator.component.html',
  styleUrls: ['./rgba-coordinator.component.css']
})
export class RgbaCoordinatorComponent implements OnInit, Observer<Rgba>  {

  // Values for rgba color
  static appRgba: Rgba = new Rgba();

  // Temp variable to view orientation
  private orientation = {
    alpha: 0,
    gamma: 0,
    beta: 0
  };

  private modifiers: ColorModifier[] = [];

  // Move to an array that can be looped through for all coordinators
  // modifiers
  private cmtOrientation: CmTOrientation = new CmTOrientation();


  constructor() {
    this.modifiers.push(new CmTOrientation());

    for(let modifier of this.modifiers) {
      modifier.subscribe(this);
      modifier.init();
    }
  }

  ngOnInit() {
    // this object to its modifiers
    // this.cmtOrientation.subscribe(this);

    // Temp event listener to view orientation
    window.addEventListener("deviceorientation", (event)=>{
      event.alpha? this.orientation.alpha = event.alpha : this.orientation.alpha = -1;
      event.gamma? this.orientation.gamma = event.gamma : this.orientation.gamma = -1;
      event.beta? this.orientation.beta = event.beta : this.orientation.beta = -1;
      }, true);
  }

  // Work around function to allow RgbaComponent to reference static variable
  // https://stackoverflow.com/questions/39193538/how-to-bind-static-variable-of-component-in-html-in-angular-2
  getAppRgba() {
    return RgbaCoordinatorComponent.appRgba;
  }

  // Method to comply with Observer interface
  next(rgba: Rgba) {
    console.log(this);
    RgbaCoordinatorComponent.appRgba = rgba;
  }

  // Method to comply with Observer interface
  error(e) {

  }

  // Method to comply with Observer interface
  complete() {

  }


  // Temp method for prototyping
  print() {
    // console.log(this.appRgba);
    this.cmtOrientation.next(new Rgba(0,0,0,1));
  }

  // Temp method for prototyping
  status() {
    console.log(RgbaCoordinatorComponent.appRgba);
  }

}
