import { ColorModifier } from './color-modifier';
import { Rgba } from '../rgba/rgba';


export class CmGeolocation extends ColorModifier {
  private coords; // lat -90 to 90; long -180 to 180;

  init() {
    if("geolocation" in navigator) {
      // navigator.geolocation.watchPosition
      navigator.geolocation.getCurrentPosition((position)=> {
        this.coords = position.coords;

        // ensure coordinates are not null
        if(this.coords) this.updateColor();
      });
    }
  }

  hashColor(rgba:Rgba):Rgba {
    // TODO: determine if there is a better way to scale these colors
    let newRed = 255;
    let newGreen = rgba.green;
    let newBlue = rgba.blue;

    if(this._settings.colorSettings.redOn) {
      newRed = (rgba.red + Math.floor(this.coords.latitude+90)
        + Math.floor(this.coords.longitude+180))%ColorModifier.MAX_RGBA_VALUE;
    }

    return new Rgba(newRed, newGreen, newBlue);
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
