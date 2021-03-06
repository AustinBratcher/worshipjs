import { Rgba } from '../rgba/rgba';

import { Subject } from 'rxjs/Rx';

export abstract class ColorModifier extends Subject<Rgba> {

  // Static variables for general use
  static MAX_RGBA_VALUE:number = 256;
  static ONE_SECOND:number = 1000;  // one second in milliseconds
  static ONE_HOUR:number = 3600000; // one hour in milliseconds
  static ONE_DAY:number = 86400000; // one day in milliseconds

  // Values for rgba color
  static appRgba: Rgba = new Rgba();

  // Update colors and
  updateColor() {
    ColorModifier.appRgba = this.hashColor(ColorModifier.appRgba);
    this.next(ColorModifier.appRgba);
  }

  abstract hashColor(rgba: Rgba): Rgba;

  // Abstract method to set up any necessary services, etc. for this item
  // Init is used instead of constructor for this so as to allow for next to be
  // called on these subjects after they are created.
  abstract init();

  static hash(str:string) {
    // TODO: Import from string-hash library https://github.com/darkskyapp/string-hash
    let hash = 5381;
    let stringLength = str.length;

    while(stringLength) {
      hash = (hash * 33) ^ str.charCodeAt(--stringLength);
    }

    return hash >>> 0;
  }
}
