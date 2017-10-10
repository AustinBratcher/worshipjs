import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmDevice extends ColorModifier{

  private userAgent = '';

  init() {

    this.userAgent = window.navigator.userAgent;

    this.updateColor();
  }

  hashColor(rgba:Rgba):Rgba {
    let newRed = rgba.red;
    let newGreen = 255;
    let newBlue = rgba.blue;

    if(this._settings.colorSettings.greenOn) {
      newGreen = (rgba.green + ColorModifier.hash(this.userAgent))%ColorModifier.MAX_RGBA_VALUE;
    }

    return new Rgba(newRed, newGreen, newBlue);
  }

}
