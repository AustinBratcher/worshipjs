import { HttpClient } from '@angular/common/http';

import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

import { WeatherApiService } from '../../weather-api.service';

export class CmWeather extends ColorModifier {

  private weatherDetails:any;
  private _weatherApi:WeatherApiService;

  constructor(protected _http:HttpClient)  {
    super();
    this._weatherApi = new WeatherApiService(_http);
  }

  init() {
      this._weatherApi.subscribe(
        (weatherDetails) => {
          this.weatherDetails = weatherDetails

          // NOTE: the use of the static variable creates a circular dependency
          // This was an intentional design, as the RgbaCoordinatorComponent is intented to
          // coordinat all the modifiers and the RgbaComponent. It is a "middle man"
          // of sorts for the module consisting of the RgbaComponent and modifiers.
          this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
        },
        (err) => {
            console.log(err);
        }
      );
      this._weatherApi.getWeatherFromApi();
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = rgba.red;
    let newGreen = rgba.green
    let newBlue = (rgba.blue + Math.floor(this.weatherDetails['temp']))%ColorModifier.MAX_RGBA_VALUE;

    return new Rgba(newRed, newGreen, newBlue);
  }
}
