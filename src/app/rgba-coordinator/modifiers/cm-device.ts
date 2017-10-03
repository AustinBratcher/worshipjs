import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';

export class CmDevice extends ColorModifier{

  private userAgent = '';

  init() {

    this.userAgent = window.navigator.userAgent;

    this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
  }

  hashColor(rgba:Rgba):Rgba {
    let newRed = rgba.red;
    let newGreen = (rgba.green + ColorModifier.hash(this.userAgent))%ColorModifier.MAX_RGBA_VALUE;
    let newBlue = rgba.blue;

    return new Rgba(newRed, newGreen, newBlue);
  }

}
