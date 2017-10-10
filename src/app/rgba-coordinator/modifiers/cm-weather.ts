import { HttpClient } from '@angular/common/http';

import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

import { SettingsService } from '../../settings/settings.service';

import { WeatherApiService } from '../../weather-api.service';

export class CmWeather extends ColorModifier {

  private weatherDetails:any;
  private _weatherApi:WeatherApiService;

  constructor(protected _http:HttpClient, protected _settings:SettingsService)  {
    super(_settings);
    this._weatherApi = new WeatherApiService(_http);
  }

  init() {
      this._weatherApi.subscribe(
        (weatherDetails) => {
          this.weatherDetails = weatherDetails

          this.updateColor();
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
    let newBlue = 255;

    if(this._settings.colorSettings.blueOn) {
      newBlue = (rgba.blue + Math.floor(this.weatherDetails['temp']))%ColorModifier.MAX_RGBA_VALUE;
    }

    return new Rgba(newRed, newGreen, newBlue);
  }
}
