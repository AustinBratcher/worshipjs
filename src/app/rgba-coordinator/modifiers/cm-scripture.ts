import { HttpClient } from '@angular/common/http';

import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
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
      this._netApi.subscribe(
        (verseDetails) => {
          this.verseDetails = verseDetails

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
      this._netApi.getScriptureFromApi();
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = (rgba.red + ColorModifier.hash(this.verseDetails.reference))%ColorModifier.MAX_RGBA_VALUE;
    console.log("script: " + newRed);
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    return new Rgba(newRed, newGreen, newBlue);
  }
}
