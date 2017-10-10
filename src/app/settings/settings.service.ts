// General Angular/3rd Party imports
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

// General Component/Class imports
import { ColorSettings } from './color-settings';

@Injectable()
export class SettingsService extends Subject<ColorSettings> {

  private _colorSettings: ColorSettings = new ColorSettings();

  constructor() {
    super();
  }

  changeColorSetting(color: string, value: boolean) {
    this._colorSettings[color] = value;

    // Emit next when color setting is changed
    this.next(this._colorSettings);
  }

  get colorSettings() {
    return this._colorSettings;
  }


}
