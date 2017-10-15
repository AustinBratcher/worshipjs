import { Component, OnInit } from '@angular/core';

// General Component/Class imports
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private checked: boolean = true;
  private disabled: boolean = false;
  private color:string = 'primary';

  constructor(private _settings: SettingsService) { }

  ngOnInit() {
  }

  onChange(color: string, value:boolean) {
    this._settings.changeColorSetting(color, value);
  }

}
