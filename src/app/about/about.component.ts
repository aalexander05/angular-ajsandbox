import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../trivia.service';

import { TriviaQuestion } from '../trivia-question';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ TriviaService ]
})
export class AboutComponent implements OnInit {

  constructor(private svc : TriviaService) { }

  triviaQuestions : TriviaQuestion[]
  
  getData() : void {
    
    this.svc.getData()
      .subscribe(data => {
        this.triviaQuestions = data.results;
        //console.log(this.triviaQuestions);
        this.unescapeQuestions();
        this.processQuestions();
      });
      
  }

  processQuestions() : void {
    for (var i = 0; i < this.triviaQuestions.length; i++) {
      //console.log(this.triviaQuestions[i])
      var ans = [];
      ans.push(this.triviaQuestions[i].correct_answer);
      ans.push.apply(ans, this.triviaQuestions[i].incorrect_answers);
      this.triviaQuestions[i].answers = this.shuffle(ans);
      //console.log(this.triviaQuestions[i]); 
      this.triviaQuestions[i].correct = false;
      this.triviaQuestions[i].incorrect = false;
      this.triviaQuestions[i].answered = false;
    }
  }
    

  unescapeQuestions() : void {
    for (var i = 0; i < this.triviaQuestions.length; i++) {
      //console.log(this.triviaQuestions[i]);
      this.triviaQuestions[i].question = this.decodeHtml(this.triviaQuestions[i].question);

      this.triviaQuestions[i].correct_answer = this.decodeHtml(this.triviaQuestions[i].correct_answer);

      for (var index in this.triviaQuestions[i].incorrect_answers) {
        var incorrectAnswer = this.triviaQuestions[i].incorrect_answers[index];
        incorrectAnswer = this.decodeHtml(incorrectAnswer);
        this.triviaQuestions[i].incorrect_answers[index] = incorrectAnswer;

      }
    }
  }

  shuffle(a : string[]) : string[] {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  

  log() {
    console.log(this.triviaQuestions);
  }

  checkAnswer(answer, triviaQuestion : TriviaQuestion) {
    triviaQuestion.answered = true;
    console.log(answer);
    var correct : boolean;
    if (triviaQuestion.correct_answer === answer) {
      console.log("CORRECT");
      correct = true;
    }
    else {
      console.log("INCORRECT");
      correct = false;
    }

    triviaQuestion.correct = correct;
    triviaQuestion.incorrect = !correct;

  }

  reset() : void {
    this.getData();
    window.scrollTo(0,0);
  }

  ngOnInit() {
    
    this.getData();
    
  }
  
}