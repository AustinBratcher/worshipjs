import { HttpClient } from '@angular/common/http';

import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

import { SettingsService } from '../../settings/settings.service';

import { StockApiService } from '../../stock-api.service';

export class CmStock extends ColorModifier {

  private stockDetails:any;
  private _stockApi:StockApiService;

  constructor(protected _http:HttpClient, protected _settings:SettingsService)  {
    super(_settings);
    this._stockApi = new StockApiService(_http);
  }

  init() {
      this._stockApi.subscribe(
        (stockDetails) => {
          this.stockDetails = stockDetails

          this.updateColor();
        },
        (err) => {
            console.log(err);
        }
      );
      this._stockApi.getStocksFromApi();
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = rgba.red;
    let newGreen = rgba.green;
    let newBlue = 255;

    if(this._settings.colorSettings.blueOn) {
      newBlue = (rgba.blue + ColorModifier.hash(this.stockDetails[Object.keys(this.stockDetails)[0]]))%ColorModifier.MAX_RGBA_VALUE;
    }

    return new Rgba(newRed, newGreen, newBlue);
  }
}
