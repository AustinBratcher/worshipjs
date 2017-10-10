// Imports from Angular/3rd Party
import { Component, OnInit } from '@angular/core';

// General Classes and Components
import { Rgba } from './rgba';
import { SettingsService } from '../../settings/settings.service';


@Component({
  selector: 'app-rgba',
  templateUrl: './rgba.component.html',
  styleUrls: ['./rgba.component.css']
})
export class RgbaComponent implements OnInit{

  // rgba variable for background color
  private rgba: Rgba;

  // Dynamic styles object
  private currentStyles = {};

  constructor(private _settings: SettingsService) {
    this.rgba = new Rgba();

    this._settings.subscribe(
      (colorSetting) => {
        // When settings are updated, update the current colors
        this.updateCurrentStyles();
      },
      (err) => {
        console.log(err);
      }
    );

  }

  ngOnInit() { }

  // Update background color of this component
  public updateColors(rgba:Rgba) {
    this.rgba.red = rgba.red;
    this.rgba.blue = rgba.blue;
    this.rgba.green = rgba.green;
    this.rgba.alpha = rgba.alpha;

    // Update dynamic styles
    this.updateCurrentStyles();
  }

  // Update dynamics style
  updateCurrentStyles() {
    // Update styles based on the current settings
    let redVal = (this._settings.colorSettings.redOn) ? this.rgba.red : Rgba.MAX_VALUE;
    let greenVal = (this._settings.colorSettings.greenOn) ? this.rgba.green : Rgba.MAX_VALUE;
    let blueVal = (this._settings.colorSettings.blueOn) ? this.rgba.blue : Rgba.MAX_VALUE;

    this.currentStyles ={
      'background-color': `rgba(${redVal}, ${greenVal}, ${blueVal}, ${this.rgba.alpha})`
    };
  }

}
