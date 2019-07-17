import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import { Card } from './card';
import { Draw } from './draw';
import { Shuffle } from './shuffle';

@Injectable()
export class CardService {

  shuffleUrl : string = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  
  constructor(private http : HttpClient) { }

  shuffle() : Observable<Shuffle> {
    return this.http.get<Shuffle>(this.shuffleUrl);
  }

  draw(deckId : string, numOfCards : number) : Observable<Draw> {
    var url = "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=" + numOfCards;
    console.log(url);
    return this.http.get<Shuffle>(url);
  }


}