import { Component, OnInit} from '@angular/core';

import { RgbaCoordinatorComponent } from './rgba-coordinator/rgba-coordinator.component';

// http://reactivex.io/documentation/observable.html
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit() {
  }


}
