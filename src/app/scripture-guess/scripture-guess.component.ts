import { Component, OnInit, Input } from '@angular/core';

import { Scripture, GameMode } from './scripture';

import { ScriptureService } from './scripture.service'

@Component({
  selector: 'app-scripture-guess',
  templateUrl: './scripture-guess.component.html',
  styleUrls: ['./scripture-guess.component.css']
})
export class ScriptureGuessComponent implements OnInit {

  scripture : Scripture;
  pagebooks : any[];
  message: string = 'incorrect';
  changingScripture = false;
  changingAnswers = false;
  answered = false;

  @Input() gameMode : GameMode 
  // = {
  //   answerCount : 4,
  //   curatedScriptures: []
  // };

  constructor(private scv : ScriptureService) { }

  getScripture() : void {
    this.changingScripture = true;
    this.changingAnswers = true;
    this.message = 'incorrect';
    //this.pagebooks = [];
    console.log('getting scripture');
    this.scv.getRandomScripture().then( (scripture) => {
      console.log('we got a scripture');
      console.log(scripture);
      this.scripture = scripture;
      this.getBooks();
      this.changingScripture = false;
    })
  }

  getBooks() : void {
    console.log('GETTING BOOKS');
    
    // this.scv.getBookInfo().then( (books) => { 
    //   console.log('We GOT BOOKS');
    //   this.pagebooks = books; 
    // } ) ;
    console.log(this.gameMode);
    if (this.gameMode.answerCount < 66) {

      
      let correctAnswer = this.scripture.verses[0].book_name;
      this.scv.getAnswerOptions(this.gameMode.answerCount, correctAnswer).then( (books) => { 
        console.log('We GOT BOOKS');
        console.log(books);
        this.pagebooks = books; 
        this.changingAnswers = false
      } ) ;
    } 
    else {
      this.scv.getBookInfo().then( (books) => { 
        console.log('We GOT BOOKS');
        console.log(books);
        this.pagebooks = books.map(o => o.bookName); 
        this.changingAnswers = false
      } ) ;
    }
  }
  
  checkScripture(bookName:string) : void {
    this.answered = true;
    console.log(`checking ${bookName} against ${this.scripture.verses[0].book_name}`)
    this.message = this.scripture.verses[0].book_name.includes(bookName) ? 'Correct!' : 'Incorrect';
  }

  reset() : void {
    //this.message = '';
    this.getScripture();
    this.answered = false;
  }

  getScriptureClasses() : string {
    return this.changingScripture ? 'animated fadeOut' : 'animated fadeIn'
  }

  getButtonClasses() : string {
    return this.changingAnswers ? 'animated fadeOut' : 'animated fadeIn'
  }

  getMessageClasses() : string {
    if (this.answered) {
      return this.message === "Correct!" ? 'animated tada' : 'animated jello';
    }
    else {
      return '';
    }
  }

  ngOnInit() {
    this.getScripture();
    //this.getBooks();
  }

}