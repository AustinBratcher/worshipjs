import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

import { SettingsService } from '../../settings/settings.service';

export class CmTOrientation extends ColorModifier {

  private TIME_BETWEEN_MODS = 2 * ColorModifier.ONE_SECOND;
  private PERCENT_CHANGE_THRESHOLD = 7;

  private lastModTime = 0;
  private doAlpha: number = 0; // 0 to 360
  private doGamma: number = 0; // -90 to 90
  private doBeta: number = 0; // -180 to 180

  // constructor(private _settings: SettingsService) {
  //   super(_settings);
  // }

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation#Browser_compatibility
    // polyfill!! --> https://github.com/dorukeker/gyronorm.js
    window.addEventListener("deviceorientation", (event)=>{

      // TODO make this less sensetive (i.e. only update if there is a change greater than 5% or something of that nature);
      let newAlpha = Math.round(event.alpha);
      let newGamma = Math.round(event.gamma) + 90;
      let newBeta = Math.round(event.beta) + 180;

      let alphaChange = this.findPercentChange(this.doAlpha, newAlpha);
      let gammaChange = this.findPercentChange(this.doGamma, newGamma);
      let betaChange = this.findPercentChange(this.doBeta, newBeta);

      // Check and see when the last time the color was modified
      var currentTime = Date.now();
      var timeSinceLastMod = currentTime - this.lastModTime;

      // Only update the color ever 2 seconds and over 7% change
      if(event && timeSinceLastMod >= this.TIME_BETWEEN_MODS
          && (alphaChange > this.PERCENT_CHANGE_THRESHOLD
              || gammaChange > this.PERCENT_CHANGE_THRESHOLD
              || betaChange > this.PERCENT_CHANGE_THRESHOLD)) {

        this.doAlpha = newAlpha;
        this.doGamma = newGamma;
        this.doBeta = newBeta;

        // NOTE: the use of the static variable creates a circular dependency
        // This was an intentional design, as the RgbaCoordinatorComponent is intented to
        // coordinat all the modifiers and the RgbaComponent. It is a "middle man"
        // of sorts for the module consisting of the RgbaComponent and modifiers.
        this.updateColor();
        this.lastModTime = currentTime;
      }
    });
  }

  findPercentChange(oldVal, newVal) {
    let percent = ((oldVal - newVal)/(oldVal+1)) * 100;
    if(percent < 0) percent *= -1;
    return percent;
  }

  // Function to modify color as seen fit by this color modifier
  // TODO consider changing the name of this;
  hashColor(rgba: Rgba): Rgba {

    // TODO for the shift, scale the values to 256 before they are roundeded
    // shift orientation value
    // TODO change this to only modifiy one of these colors
    // --> This modifier is a bit "strong" compared to others. Reducing this to one colors
    // will reduce its influence.
    let newRed = rgba.red;
    let newGreen = 255;
    let newBlue = rgba.blue;

    if(this._settings.colorSettings.greenOn) {
        newGreen = (rgba.green + this.doAlpha + this.doBeta + 180 + this.doGamma + 90)%ColorModifier.MAX_RGBA_VALUE;
    }

    return new Rgba(newRed, newGreen, newBlue);

  }
}
