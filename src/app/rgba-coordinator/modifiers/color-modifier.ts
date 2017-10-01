import { Rgba } from '../rgba/rgba';

import { Subject } from 'rxjs/Rx';

export abstract class ColorModifier extends Subject<Rgba> {
  abstract modifyColors(rgba: Rgba, callback: Function);

  // TODO add sbstract Hash function

  // tODO make abstract initialization function that can call "next" for the single time modifiers
}
