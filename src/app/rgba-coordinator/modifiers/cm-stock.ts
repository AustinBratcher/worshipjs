import { HttpClient } from '@angular/common/http';

import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

import { StockApiService } from '../../stock-api.service';

export class CmStock extends ColorModifier {

  private stockDetails:any;
  private _stockApi:StockApiService;

  constructor(protected _http:HttpClient)  {
    super();
    this._stockApi = new StockApiService(_http);
  }

  init() {
      this._stockApi.subscribe(
        (stockDetails) => {
          this.stockDetails = stockDetails

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
      this._stockApi.getStocksFromApi();
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = rgba.red;
    let newGreen = rgba.green;
    let newBlue = (rgba.blue + ColorModifier.hash(this.stockDetails[Object.keys(this.stockDetails)[0]]))%ColorModifier.MAX_RGBA_VALUE;

    return new Rgba(newRed, newGreen, newBlue);
  }
}
