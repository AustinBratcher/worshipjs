// Angular/3rd Party imports
import { HttpClient } from '@angular/common/http';

// General Component/Class imports
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
    // Subscribe to events from stock service
    this._stockApi.subscribe(
      (stockDetails) => {
        // Update when stock info is received
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
    let newBlue = (rgba.blue + ColorModifier.hash(this.stockDetails[Object.keys(this.stockDetails)[0]]))%ColorModifier.MAX_RGBA_VALUE;

    return new Rgba(newRed, newGreen, newBlue);
  }
}
