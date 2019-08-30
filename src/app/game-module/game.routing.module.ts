import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CityPageComponent } from './city-page/city-page.component';

const routes: Routes = [{
    path: '',
    component: GameComponent
}, {
  path: 'city/:id',
  component: CityPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
