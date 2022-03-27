import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { PlayGameComponent } from './play-game/play-game.component';

const routes: Routes = [
  { path: 'mancala/create-game', component: CreateGameComponent },
  { path: 'mancala/:gameId/play-game', component: PlayGameComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MancalaRoutingModule { }
