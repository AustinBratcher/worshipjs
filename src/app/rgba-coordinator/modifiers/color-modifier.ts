import { Rgba } from '../rgba/rgba';

import { Subject } from 'rxjs/Rx';

export abstract class ColorModifier extends Subject<Rgba> {
  static MAX_RGBA_VALUE:number = 256;

  static ONE_SECOND:number = 1000;  // one second in milliseconds
  static ONE_HOUR:number = 3600000; // one hour in milliseconds
  static ONE_DAY:number = 86400000; // one day in milliseconds

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
