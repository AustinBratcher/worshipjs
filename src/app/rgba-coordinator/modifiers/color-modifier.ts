import { Rgba } from '../rgba/rgba';
import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';

import { SettingsService } from '../../settings/settings.service';

import { Subject } from 'rxjs/Rx';

export abstract class ColorModifier extends Subject<Rgba> {
  static MAX_RGBA_VALUE:number = 256;

  static ONE_SECOND:number = 1000;  // one second in milliseconds
  static ONE_HOUR:number = 3600000; // one hour in milliseconds
  static ONE_DAY:number = 86400000; // one day in milliseconds

  constructor(protected _settings:SettingsService) {
    super();
    this._settings.subscribe(
      (colorSetting) => {
        this.updateColor();
      },
      (err) => {

      }
    );
  }

  updateColor() {
    // NOTE: the use of the static variable creates a circular dependency
    // This was an intentional design, as the RgbaCoordinatorComponent is intented to
    // coordinat all the modifiers and the RgbaComponent. It is a "middle man"
    // of sorts for the module consisting of the RgbaComponent and modifiers.
    this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
  }

  abstract hashColor(rgba: Rgba): Rgba;

  // Abstract method to set up any necessary services, etc. for this item
  // Init is used instead of constructor for this so as to allow for next to be
  // called on these subjects after they are created.
  abstract init();

  static hash(str) {
    // TODO: Import from string-hash library https://github.com/darkskyapp/string-hash
    var hash = 5381,
        i    = str.length;

    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }


    return hash >>> 0;
  }
}
