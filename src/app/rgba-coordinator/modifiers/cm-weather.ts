// Angular/3rd party imports
import { HttpClient } from '@angular/common/http';

// General Component/Class imports
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
    // subscribe to the weather service
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
    let newBlue = (rgba.blue + Math.floor(this.weatherDetails['temp']))%ColorModifier.MAX_RGBA_VALUE;

    return new Rgba(newRed, newGreen, newBlue);
  }
}
