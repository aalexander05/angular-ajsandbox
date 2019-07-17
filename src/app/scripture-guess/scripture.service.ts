import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/observable';

import { Scripture, Verse, CuratedScripture, GameMode } from './scripture';

@Injectable()
export class ScriptureService {

  baseUrl : string = 'https://bible-api.com/'

  books : any[];
  currentBook: any;
  currentChapter: number;
  currentVerse: number;



  constructor(private http: HttpClient) { 
    
  }

  getBookInfo() : Promise<any> {
    return this.http.get('./assets/bible-info.json').toPromise();
  }

  getRandomBook() : void {
    console.log('do you like books?')
    
  }

  async getHighestVerseNumberInBook() : Promise<number> {
    var highestVerse : number = 0;
    let scripture = await this.getScripture(this.currentBook.bookName, this.currentChapter, 0, '');

    highestVerse = Math.max(...scripture.verses.map(o => o.verse), 0);
    console.log( `the highest verse of ${this.currentBook.bookName} ${this.currentChapter} is ${highestVerse}`);

    return highestVerse;
    
  }

  async getRandomScripture() : Promise<Scripture> {
    this.books = await this.getBookInfo();
    console.log('what is thing?');
    console.log(this.books);
    this.currentBook = this.books[Math.floor(Math.random()*this.books.length)];
    console.log(this.currentBook);
    this.currentChapter = Math.floor(Math.random() * this.currentBook.numberOfBooks + 1);

    let verse = await this.getHighestVerseNumberInBook();

    this.currentVerse = Math.floor(Math.random() * verse + 1)
    console.log(`RANDOM VERSE ${this.currentVerse}`);

    //return this.getScripture("Genesis", 1,1,'');
    return this.getScripture(this.currentBook.bookName, this.currentChapter, this.currentVerse, '');
    
    
  }
  
  getScripture(book: string, chapter: number, verse: number, translation: string) : Promise<Scripture> {
    var url = this.baseUrl;
    var chapterValue :string = chapter === 0 ? '':chapter.toString();
    var verseValue :string = verse === 0 ? '' : ':' + verse;

    url = url + book + chapterValue + verseValue;

    if (translation !== '') {
      url = url + '?translation=' + translation;
    }
    console.log(url);
    return this.http.get<Scripture>(url).toPromise();

  }

  async getAnswerOptions(answerCount: number, correctAnswer: string) : Promise<string[]> {
    var answers: string[] = [correctAnswer];
    let books = await this.getBookInfo();
    let countToAdd = answerCount - 1;
    var bookAnswer;
    for (var i = 0; i < countToAdd; i++) {
      do {
        bookAnswer = this.books[Math.floor(Math.random()*this.books.length)].bookName;
      }
      while (answers.includes(bookAnswer))
      answers.push(bookAnswer);
    }
    this.shuffle(answers);
    return answers;
    
  }

  shuffle(a : string[]) : string[] {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

}