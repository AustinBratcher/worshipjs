import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private checked: boolean = true;
  private disabled: boolean = false;
  private color:string = 'accent';

  constructor(private _settings: SettingsService) { }

  ngOnInit() {

  }

  print() {
    console.log(this._settings.colorSettings.redOn);
  }

  onChange(color: string, value:boolean) {
    this._settings.changeColorSetting(color, value);
  }

}
