import { Component, OnInit, Input, OnChanges, DoCheck} from '@angular/core';

import { Rgba } from './rgba';

@Component({
  selector: 'app-rgba',
  templateUrl: './rgba.component.html',
  styleUrls: ['./rgba.component.css']
})
export class RgbaComponent implements OnInit{


  @Input()
  private rgba: Rgba;

  // Dynamic styles object
  private currentStyles = {};

  constructor() {
  }

  ngOnInit() {
    // this.updateCurrentStyles();
  }


  ngOnChanges() {
    console.log("changed");
    this.updateCurrentStyles();
  }

  getRgba() {
    return this.rgba;
  }

  updateColors(rgba:Rgba) {
    // Shell method to follow the rules of the ColorModifier interface
    this.rgba.red = rgba.red;
    this.rgba.blue = rgba.blue;
    this.rgba.green = rgba.green;
    this.rgba.alpha = rgba.alpha;

    //this.ngOnChanges();

    // Update dynamic styles
    this.updateCurrentStyles();
  }

  // Update dynamics style
  updateCurrentStyles() {
    this.currentStyles ={
      'background-color': 'rgba(' + this.rgba.red + ',' + this.rgba.green + ',' + this.rgba.blue + ',' + this.rgba.alpha +')'
    };
  }

}
