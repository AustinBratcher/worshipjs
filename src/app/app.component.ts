// TODO move functionality to a "lower" nested level.
// This whole process is itself a component of a larger app, not necessarily the whole thing.
// This will also allow for better seperation of components that are displayed
// NOTE: when this is done, import directories will need to be updated.
// NOTE This should be done sooner than later so as to not let changes that will need to be made grow

import { Component, OnInit} from '@angular/core';
import { Observer } from 'rxjs/Rx';

import { RgbaComponent } from './rgba/rgba.component';
import { Rgba } from './rgba/rgba';

import { CmWeather } from './modifiers/cm-weather';
import { CmTOrientation } from './modifiers/cm-t-orientation';

// http://reactivex.io/documentation/observable.html
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, Observer<Rgba> {
  title = 'app';

  // Values for rgba color
  static appRgba: Rgba = new Rgba();

  // Temp variable to view orientation
  private orientation = {
    alpha: 0,
    gamma: 0,
    beta: 0
  };

  // modifiers
  private cmtOrientation: CmTOrientation = new CmTOrientation();

  ngOnInit() {
    // this object to its modifiers
    this.cmtOrientation.subscribe(this);

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
    return AppComponent.appRgba;
  }

  // Method to comply with Observer interface
  next(rgba: Rgba) {
    console.log(this);
    AppComponent.appRgba = rgba;
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
    console.log(AppComponent.appRgba);
  }

}
