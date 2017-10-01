import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';
import { Subject } from 'rxjs/Rx';

export class CmWeather extends Subject<Rgba> implements ColorModifier {

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/


  modifyColors(rgba: Rgba, callback: Function) {

    rgba.red = 200;
    rgba.blue = 100;
    rgba.green = 0;
    rgba.alpha = 0.5;

    callback(rgba);
  }

}
