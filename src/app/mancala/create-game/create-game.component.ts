import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  form!: FormGroup;

  constructor(public gameService: GameService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      player1Name: new FormControl('', [Validators.required]),
      player2Name: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.gameService.create(this.form.value.player1Name, this.form.value.player2Name).subscribe((res: any) => {
      console.log(res.id);
      console.log('Game created successfully!');
      this.router.navigateByUrl('mancala/'+res.id+'/play-game');
    })
  }

}
