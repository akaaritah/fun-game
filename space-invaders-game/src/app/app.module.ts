import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShipComponent } from './ship/ship.component';
import { MenuComponent } from './menu/menu.component';
import { ObstacleComponent } from './obstacle/obstacle.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipComponent,
    MenuComponent,
    ObstacleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
