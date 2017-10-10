export class ColorSettings {
  constructor(private _redOn: boolean = true,
  private _blueOn: boolean = true,
  private _greenOn: boolean = true){}

  get redOn() {
    return this._redOn;
  }

  set redOn(redOn: boolean) {
    this._redOn = redOn;
  }

  get greenOn() {
    return this._greenOn;
  }

  set greenOn(greenOn: boolean) {
    this._greenOn = greenOn; 
  }

  get blueOn() {
    return this._blueOn;
  }

  set blueOn(blueOn: boolean) {
    this._blueOn = blueOn;
  }
}
