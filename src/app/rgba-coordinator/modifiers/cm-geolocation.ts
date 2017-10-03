import { RgbaCoordinatorComponent } from '../rgba-coordinator.component';
import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';


export class CmGeolocation extends ColorModifier {
  private coords; // lat -90 to 90; long -180 to 180;

  init() {
    if("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position)=> {
        this.coords = position.coords;

        // ensure coordinates are not null
        if(this.coords) this.next(this.hashColor(RgbaCoordinatorComponent.appRgba));
      });
    }
  }

  hashColor(rgba:Rgba):Rgba {
    let newRed = rgba.red;
    let newGreen = rgba.green;

    // TODO: determine if there is a better way to scale these colors
    let newBlue = (rgba.blue + Math.floor(this.coords.latitude+90)
      + Math.floor(this.coords.longitude+180))%ColorModifier.MAX_RGBA_VALUE;

    return new Rgba(newRed, newGreen, newBlue);
  }

  scale(){

  }

  getGeoLocation() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords);
      });
    }
    else console.log('off');
  }

}
