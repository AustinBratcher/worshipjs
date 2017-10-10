// Class representation of RGBA color scheme
export class Rgba {
  static MAX_VALUE:number = 255; 

  constructor(public red: number = 255,
              public green: number = 255,
              public blue: number = 255,
              public alpha: number = 1) {}
}
