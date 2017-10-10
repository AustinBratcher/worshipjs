// General Component/class imports
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmVOrientation extends ColorModifier{

  private PORTRAIT = 1;
  private LANDSCAPE = 2;

  private lastOrientation = 0;


  init() {
      // listen for device rotation events
      window.addEventListener("deviceorientation", (event)=>{
        this.actOnOrientation();
      });

      // listen for browser resize events
      window.addEventListener("resize", (event)=>{
        this.actOnOrientation();
      });
    }

  actOnOrientation() {
    let currentOrientation = this.getViewportOrientation();
    if(currentOrientation != this.lastOrientation) {
      this.lastOrientation = currentOrientation;
      this.updateColor();
    }
  }

  // Return 1 if porrait, 2 if landscape.
  getViewportOrientation() {
    if(window.innerHeight > window.innerWidth) {
      return this.PORTRAIT;
    }
    return this.LANDSCAPE;
  }

  hashColor(rgba:Rgba): Rgba {
    let newRed = rgba.red;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    if(this.lastOrientation == this.PORTRAIT) {
      // TODO: decide on appropriate multiplier
      newGreen = (newGreen + 256)%ColorModifier.MAX_RGBA_VALUE;
    }
    else {
      newGreen = Math.floor(newGreen + 256 + 128)%ColorModifier.MAX_RGBA_VALUE;
    }

    return new Rgba(newRed, newGreen, newBlue);
  }
}
