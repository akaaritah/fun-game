import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ShipComponent } from './ship/ship.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'game', component: ShipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }