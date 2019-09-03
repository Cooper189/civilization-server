import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginInGuard } from './guard/login-in.guard';

const routes: Routes = [{
  path: 'game',
  loadChildren: () => import('./game-module/game.module').then(module => module.GameModule),
  canLoad: [LoginInGuard]
}, {
  path: '',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
