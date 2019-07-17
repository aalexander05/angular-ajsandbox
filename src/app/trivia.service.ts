import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import { TriviaQuestion } from './trivia-question'

@Injectable()
export class TriviaService {

  url : string = "https://opentdb.com/api.php?amount=10";

  constructor(private http:HttpClient) { }

  getData() : Observable<any> {
    return this.http.get(this.url);
  }

}