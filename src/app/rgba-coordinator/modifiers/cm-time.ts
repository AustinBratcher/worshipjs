import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmTime extends ColorModifier {

  private ONE_HOUR:number = 3600000; // one hour
  private ONE_DAY:number = 86400000; // one day

  private currentHour: number = 0;
  private lastModTime: number = 0;

  init() {
      // NOTE: Presently in GMT timezone. Consider adjusting this for the current time zone; 
      this.currentHour = Math.floor((Date.now()%this.ONE_DAY)/this.ONE_HOUR);

      this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = (rgba.red + this.currentHour)%256;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    return new Rgba(newRed, newGreen, newBlue);
  }

}
