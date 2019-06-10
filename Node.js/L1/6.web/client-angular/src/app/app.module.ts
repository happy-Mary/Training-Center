import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FacebookModule} from 'ngx-facebook';

import {AppComponent} from './app.component';
import {CowsComponent} from './cows/cows.component';
import {PigsComponent} from './pigs/pigs.component';
import {CowsService} from "./cows/cows.service";

const appRoutes: Routes = [
  {path: 'cows', component: CowsComponent},
  {path: 'pigs', component: PigsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CowsComponent,
    PigsComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [CowsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
