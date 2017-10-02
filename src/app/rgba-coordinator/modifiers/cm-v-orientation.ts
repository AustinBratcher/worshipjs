import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmVOrientation extends ColorModifier{

  private PORTRAIT = 1;
  private LANDSCAPE = 2;

  private lastOrientation = 0;


  init() {
      // TODO: since this funcationality is much slower, adjust so this event is called as much
      // The frequency of calling these event listeners could be dramatic (i.e. throttle this event)

      // listen for device rotation events
      window.addEventListener("deviceorientation", (event)=>{

        let currentOrientation = this.getViewportOrientation();
        if(currentOrientation != this.lastOrientation) {
          this.lastOrientation = currentOrientation;

          // NOTE: the use of the static variable creates a circular dependency
          // This was an intentional design, as the RgbaCoordinatorComponent is intented to
          // coordinat all the modifiers and the RgbaComponent. It is a "middle man"
          // of sorts for the module consisting of the RgbaComponent and modifiers.
          this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
        }
      });

      // listen for browser resize events
      window.addEventListener("resize", (event)=>{

        let currentOrientation = this.getViewportOrientation();
        if(currentOrientation != this.lastOrientation) {
          this.lastOrientation = currentOrientation;

          // NOTE: the use of the static variable creates a circular dependency
          // This was an intentional design, as the RgbaCoordinatorComponent is intented to
          // coordinat all the modifiers and the RgbaComponent. It is a "middle man"
          // of sorts for the module consisting of the RgbaComponent and modifiers.
          this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
        }
      });
    }

  hashColor(rgba:Rgba): Rgba {
    let newRed = rgba.red;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    // // reset blue if at 0;
    // if(newBlue == 0) {
    //   newBlue += 255;
    // }

    if(this.lastOrientation == this.PORTRAIT) {

      // TODO: decide on appropriate multiplier
      newBlue = (newBlue + 256)%ColorModifier.MAX_RGBA_VALUE;
      // console.log('updating for portrait: ' + newBlue);
    }
    else {
      newBlue = Math.floor(newBlue + 256 + 128)%ColorModifier.MAX_RGBA_VALUE;
      // console.log('updating for landscape: ' + newBlue);
    }

    return new Rgba(newRed, newGreen, newBlue);
  }


  // Return 1 if porrait, 2 if landscape.
  getViewportOrientation() {
    if(window.innerHeight > window.innerWidth) {
      return this.PORTRAIT;
    }
    return this.LANDSCAPE;
  }

}
