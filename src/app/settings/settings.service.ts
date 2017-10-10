import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Rx';

import { ColorSettings } from './color-settings';

@Injectable()
export class SettingsService extends Subject<ColorSettings> {

  private _colorSettings: ColorSettings = new ColorSettings();

  constructor() {
    super();
  }

  changeColorSetting(color: string, value: boolean) {
    this._colorSettings[color] = value;
    this.next(this._colorSettings);
  }

  get colorSettings() {
    return this._colorSettings;
  }


}
