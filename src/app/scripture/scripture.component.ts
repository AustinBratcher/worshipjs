import { Component, OnInit } from '@angular/core';
import { NetApiService } from './net-api.service';

@Component({
  selector: 'app-scripture',
  templateUrl: './scripture.component.html',
  styleUrls: ['./scripture.component.css']
})
export class ScriptureComponent implements OnInit {

  private verseDetails: any;

  constructor(private _netApi: NetApiService) {
  }

  ngOnInit() {
    this._netApi.subscribe(
      (verseDetails) => {
        this.verseDetails = verseDetails;
      },
      (err) => {
        console.log(err);
      }
    );
    this._netApi.getScriptureFromApi();
  }

}
