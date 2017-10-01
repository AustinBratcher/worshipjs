import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';
import { Subject } from 'rxjs/Rx';

export class CmTOrientation extends ColorModifier{

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

  constructor() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation#Browser_compatibility
    // polyfill!! --> https://github.com/dorukeker/gyronorm.js
    window.addEventListener("deviceorientation", (event)=>{
      let alpha = Math.round(event.alpha);
      let gamma = Math.round(event.gamma);
      let beta = Math.round(event.beta);
      if(alpha < 0) alpha *= -1;
      if(gamma < 0) gamma *= -1;
      if(beta < 0) beta *= -1;


      if(event) this.next(new Rgba(alpha, gamma, beta, 1));
    });


    super();
  }

  modifyColors(rgba: Rgba, callback: Function) {

    rgba.red = 200;
    rgba.blue = 100;
    rgba.green = 0;
    rgba.alpha = 0.5;

    callback(rgba);
  }

}
