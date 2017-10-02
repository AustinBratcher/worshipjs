import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmTOrientation extends ColorModifier {

  private TIME_BETWEEN_MODS = 2000;

  private lastModTime = 0;
  private doAlpha: number = 0; // 0 to 360
  private doGamma: number = 0; // -90 to 90
  private doBeta: number = 0; // -180 to 180

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation#Browser_compatibility
    // polyfill!! --> https://github.com/dorukeker/gyronorm.js
    window.addEventListener("deviceorientation", (event)=>{

      // TODO make this less sensetive (i.e. only update if there is a change greater than 5% or something of that nature);
      this.doAlpha = Math.round(event.alpha);
      this.doGamma = Math.round(event.gamma);
      this.doBeta = Math.round(event.beta);

      // Check and see when the last time the color was modified
      let currentTime = Date.now();
      let timeSinceLastMod = currentTime - this.lastModTime;

      // Only update the color ever 2 seconds
      if(event && timeSinceLastMod >= this.TIME_BETWEEN_MODS) {

        // NOTE: the use of the static variable creates a circular dependency
        // This was an intentional design, as the RgbaCoordinatorComponent is intented to
        // coordinat all the modifiers and the RgbaComponent. It is a "middle man"
        // of sorts for the module consisting of the RgbaComponent and modifiers.
        this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
        this.lastModTime = currentTime;
      }
    });
  }

  // Function to modify color as seen fit by this color modifier
  // TODO consider changing the name of this;
  hashColor(rgba: Rgba): Rgba {

    // shift orientation value
    let newRed = (this.doAlpha + rgba.red)%256;
    let newGreen = (this.doGamma + 90 + rgba.green)%256;
    let newBlue = (this.doBeta + 180 + rgba.blue)%256;


    return new Rgba(newRed, newGreen, newBlue);

  }
}
