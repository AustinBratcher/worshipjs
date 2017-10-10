// Angular/3rd party imports
import { Component, OnInit } from '@angular/core';

// General class/component imports
import { NetApiService } from './net-api.service';

@Component({
  selector: 'app-scripture',
  templateUrl: './scripture.component.html',
  styleUrls: ['./scripture.component.css']
})
export class ScriptureComponent implements OnInit {

  private verseDetails: any;

  constructor(private _netApi: NetApiService) {}

  ngOnInit() {
    // subcribe to scripture service
    this._netApi.subscribe(
      (verseDetails) => {
        // update verse details when new details are recieved 
        this.verseDetails = verseDetails;
      },
      (err) => {
        console.log(err);
      }
    );
    this._netApi.getScriptureFromApi();
  }

}
