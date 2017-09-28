export class CmVOrientation {
  // Return 1 if porrait, 2 if landscape.
  getViewportOrientation() {
    const PORTRAIT = 1;
    const LANDSCAPE = 2;
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if(window.innerHeight > window.innerWidth) {
      return PORTRAIT;
    }
    return LANDSCAPE;
  }

}
