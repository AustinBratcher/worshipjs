import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdButtonModule } from '@angular/material';


import { AppComponent } from './app.component';
import { RgbaComponent } from './rgba-coordinator/rgba/rgba.component';
import { RgbaCoordinatorComponent } from './rgba-coordinator/rgba-coordinator.component';

@NgModule({
  declarations: [
    AppComponent,
    RgbaComponent,
    RgbaCoordinatorComponent
  ],
  imports: [
    BrowserModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
