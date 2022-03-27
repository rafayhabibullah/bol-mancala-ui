import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MancalaRoutingModule } from './mancala-routing.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayGameComponent } from './play-game/play-game.component';


@NgModule({
  declarations: [
    CreateGameComponent,
    PlayGameComponent
  ],
  imports: [
    CommonModule,
    MancalaRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class MancalaModule { }
