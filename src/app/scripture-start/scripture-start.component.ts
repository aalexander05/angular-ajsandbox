import { Component, OnInit } from '@angular/core';

import {GameMode} from '../scripture-guess/scripture';

@Component({
  selector: 'app-scripture-start',
  templateUrl: './scripture-start.component.html',
  styleUrls: ['./scripture-start.component.css']
})
export class ScriptureStartComponent implements OnInit {

  constructor() { }

  gameMode : GameMode = {
    answerCount : 4,
    curatedScriptues : []
  }

  started = false;

  start() : void {
    this.started = true;
  }

  startAllBooks() : void {
    this.gameMode.answerCount = 66;
    this.started = true;
  }

  ngOnInit() {
  }

}