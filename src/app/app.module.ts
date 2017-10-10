import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule,
         MatButtonModule,
         MatSidenavModule,
         MatToolbarModule,
         MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ThoughtsComponent } from './thoughts/thoughts.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SettingsService } from './settings/settings.service';

import { RgbaComponent } from './rgba-coordinator/rgba/rgba.component';
import { RgbaCoordinatorComponent } from './rgba-coordinator/rgba-coordinator.component';
import { ScriptureComponent } from './scripture/scripture.component';
import { WeatherApiService } from './weather-api.service';
import { StockApiService } from './stock-api.service';
import { EsvApiService } from './scripture/esv-api.service';
import { NetApiService } from './scripture/net-api.service';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'thoughts', component: ThoughtsComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
     HomeComponent,
     AboutComponent,
     ThoughtsComponent,
     SettingsComponent,
     PageNotFoundComponent,
    RgbaComponent,
    RgbaCoordinatorComponent,
    ScriptureComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule
  ],
  providers: [SettingsService, EsvApiService, NetApiService, WeatherApiService, StockApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
