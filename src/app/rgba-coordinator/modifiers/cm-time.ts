// General Component/Class imports
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmTime extends ColorModifier {

  private currentHour: number = 0;
  private lastModTime: number = 0;

  init() {

      // NOTE: Presently in GMT timezone. Consider adjusting this for the current time zone;
      this.currentHour = Math.floor((Date.now()%ColorModifier.ONE_DAY)/ColorModifier.ONE_HOUR);

      this.updateColor();
  }

  hashColor(rgba: Rgba): Rgba {
    let newRed = (rgba.red + this.currentHour)%ColorModifier.MAX_RGBA_VALUE;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    return new Rgba(newRed, newGreen, newBlue);
  }

}
