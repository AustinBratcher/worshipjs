// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Angular Material imports
import { MatButtonModule,
         MatIconModule,
         MatSidenavModule,
         MatSlideToggleModule,
         MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Page imports
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { ThoughtsComponent } from './thoughts/thoughts.component';

// Service imports
// import { EsvApiService } from './scripture/esv-api.service';
import { NetApiService } from './scripture/net-api.service';
import { SettingsService } from './settings/settings.service';
import { StockApiService } from './stock-api.service';
import { WeatherApiService } from './weather-api.service';

// General Component/Class imports
import { RgbaComponent } from './rgba-coordinator/rgba/rgba.component';
import { RgbaCoordinatorComponent } from './rgba-coordinator/rgba-coordinator.component';
import { ScriptureComponent } from './scripture/scripture.component';

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
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent,
    RgbaComponent,
    RgbaCoordinatorComponent,
    ScriptureComponent,
    SettingsComponent,
    ThoughtsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule
  ],
  providers: [
    // EsvApiService,
    NetApiService,
    SettingsService,
    StockApiService,
    WeatherApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
