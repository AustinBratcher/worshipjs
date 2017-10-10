// Angular/3rd Party Imports
import { HttpClient } from '@angular/common/http';

// General Component/Class imports
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';
import { NetApiService } from '../../scripture/net-api.service';

export class CmScripture extends ColorModifier {

  private verseDetails:any;
  private _netApi:NetApiService;

  constructor(protected _http:HttpClient)  {
    super();
    this._netApi = new NetApiService(_http);
  }

  init() {
    // Subscribe to events from scripture service
    this._netApi.subscribe(
      (verseDetails) => {
        // Update scripture when details are received 
        this.verseDetails = verseDetails
        this.updateColor();
      },
      (err) => {
          console.log(err);
      }
    );

    this._netApi.getScriptureFromApi();
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = (rgba.red + ColorModifier.hash(this.verseDetails.reference))%ColorModifier.MAX_RGBA_VALUE;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    return new Rgba(newRed, newGreen, newBlue);
  }
}
