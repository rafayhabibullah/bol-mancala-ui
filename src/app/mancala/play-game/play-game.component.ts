import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';

export interface MancalaGame {
  id: string;
  players: Array<Players>;
  playerTurn: string;
  gameStatus: string;
}

export interface Players {
  name: string;
  pitStones: Array<number>;
  bigPitStones: number;
}

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})

export class PlayGameComponent implements OnInit {

  gameId!:string;
  game!:MancalaGame;

  currentPlayerPits: Array<number> = [];
  currentBigPit: number = 0;
  otherPlayerPits: Array<number> = [];
  otherBigPit: number = 0;
  playerTurn:string = '';
  gameStatus:string = '';

  playerAName:string = '';
  playerBName:string = '';

  winnerName:string = '';
  winnerScore:number = 0;

  constructor(public gameService: GameService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['gameId'];

    this.gameService.getGameById(this.gameId).subscribe((res) => {
      for (let i = 0; i < res.players[0].pits.length; i ++) {
        this.currentPlayerPits.push(res.players[0].pits[i].stones);
        this.otherPlayerPits.push(res.players[1].pits[i].stones);
      }
      console.log(this.otherPlayerPits);
      this.currentBigPit = res.players[0].bigPit.stones;
      this.otherBigPit = res.players[1].bigPit.stones;
      this.playerTurn = res.playerTurn;
      this.gameStatus = res.gameStatus;
      
      this.playerAName = res.players[0].name;
      this.playerBName = res.players[1].name;

      if(this.gameStatus == 'GAME_OVER') {
        this.winnerName = res.winner.playerName;
        this.winnerScore = res.winner.score;
      }
    })
  }

  sow(pitIndex:number, player:string) {
    console.log(this.playerTurn);
    console.log(player);
    if(player != this.playerTurn) 
      return;
    
    // if(this.currentPlayerPits[pitIndex] == 0) {
    //   console.log("EmptyPit");
    //   return;
    // }
 

    
    
    this.gameService.sow(this.gameId, pitIndex).subscribe((res) => {
      this.currentPlayerPits = [];
      this.otherPlayerPits = [];

      for (let i = 0; i < res.players[0].pits.length; i++) {
        this.currentPlayerPits.push(res.players[0].pits[i].stones);
        this.otherPlayerPits.push(res.players[1].pits[i].stones);
      }

      console.table(this.currentPlayerPits);
      console.table(this.otherPlayerPits);

      this.currentBigPit = res.players[0].bigPit.stones;
      this.otherBigPit = res.players[1].bigPit.stones;
      this.playerTurn = res.playerTurn;
      this.gameStatus = res.gameStatus;
      
      if(this.gameStatus == 'GAME_OVER') {
        this.winnerName = res.winner.playerName;
        this.winnerScore = res.winner.score;

        alert("Game Over : " + this.winnerName + " score : " + this.winnerScore);
        this.router.navigateByUrl('mancala/create-game');
      }
    })
  }


}
