// General Component/Class imports
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmTOrientation extends ColorModifier {

  private TIME_BETWEEN_MODS = 2 * ColorModifier.ONE_SECOND;
  private PERCENT_CHANGE_THRESHOLD = 7;

  private lastModTime = 0;
  private doAlpha: number = 0; // 0 to 360
  private doGamma: number = 0; // -90 to 90
  private doBeta: number = 0; // -180 to 180

  init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation#Browser_compatibility
    // polyfill --> https://github.com/dorukeker/gyronorm.js
    window.addEventListener("deviceorientation", (event)=>{

      // Get current state from event
      let newAlpha = Math.round(event.alpha);
      let newGamma = Math.round(event.gamma) + 90;
      let newBeta = Math.round(event.beta) + 180;

      // Calculate change of state
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
        this.lastModTime = currentTime;

        this.updateColor();
      }
    });
  }

  findPercentChange(oldVal, newVal) {
    let percent = ((oldVal - newVal)/(oldVal+1)) * 100;
    if(percent < 0) percent *= -1;
    return percent;
  }

  // Function to modify color as seen fit by this color modifier
  hashColor(rgba: Rgba): Rgba {
    let newRed = rgba.red;
    let newGreen = (rgba.green + this.doAlpha + this.doBeta + 180 + this.doGamma + 90)%ColorModifier.MAX_RGBA_VALUE;
    let newBlue = rgba.blue;

    return new Rgba(newRed, newGreen, newBlue);

  }
}
