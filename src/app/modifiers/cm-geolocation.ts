export class CmGeolocation {
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
