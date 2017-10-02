import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmTime extends ColorModifier {

  private currentHour: number = 0;
  private lastModTime: number = 0;

  init() {
    
      // NOTE: Presently in GMT timezone. Consider adjusting this for the current time zone;
      this.currentHour = Math.floor((Date.now()%ColorModifier.ONE_DAY)/ColorModifier.ONE_HOUR);

      // NOTE: the use of the static variable creates a circular dependency
      // This was an intentional design, as the RgbaCoordinatorComponent is intented to
      // coordinat all the modifiers and the RgbaComponent. It is a "middle man"
      // of sorts for the module consisting of the RgbaComponent and modifiers.
      this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = (rgba.red + this.currentHour)%ColorModifier.MAX_RGBA_VALUE;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    return new Rgba(newRed, newGreen, newBlue);
  }

}
