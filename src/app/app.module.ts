import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdButtonModule } from '@angular/material';


import { AppComponent } from './app.component';
import { RgbaComponent } from './rgba/rgba.component';

@NgModule({
  declarations: [
    AppComponent,
    RgbaComponent
  ],
  imports: [
    BrowserModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
