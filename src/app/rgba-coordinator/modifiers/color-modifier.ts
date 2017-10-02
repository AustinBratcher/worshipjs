import { Rgba } from '../rgba/rgba';

import { Subject } from 'rxjs/Rx';

export abstract class ColorModifier extends Subject<Rgba> {
  static MAX_RGBA_VALUE = 256; 

  abstract hashColor(rgba: Rgba): Rgba;

  // Abstract method to set up any necessary services, etc. for this item
  // Init is used instead of constructor for this so as to allow for next to be
  // called on these subjects after they are created.
  abstract init();
}
