import { HttpClient } from '@angular/common/http';

import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

import { SettingsService } from '../../settings/settings.service';

import { NetApiService } from '../../scripture/net-api.service';

export class CmScripture extends ColorModifier {

  private verseDetails:any;
  private _netApi:NetApiService;

  constructor(protected _http:HttpClient, protected _settings:SettingsService)  {
    super(_settings);
    this._netApi = new NetApiService(_http);
  }

  init() {
      this._netApi.subscribe(
        (verseDetails) => {
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
    let newRed = 255;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    if(this._settings.colorSettings.redOn) {
      newRed = (rgba.red + ColorModifier.hash(this.verseDetails.reference))%ColorModifier.MAX_RGBA_VALUE;
    }

    return new Rgba(newRed, newGreen, newBlue);
  }
}
