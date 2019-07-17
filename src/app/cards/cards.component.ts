import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';
import { Card } from './card';
import { Draw } from './draw';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [CardService]
})
export class CardsComponent implements OnInit {

  deckId : string;
  myDraw : Draw;
  cards : Card[] = [];
  remainingCardsInDeck : number;
  drawError : any = {success:true}; 

  cardValues : string[] = [];
  
  constructor(private svc : CardService) { }

  ngOnInit() {
    this.cardValues = this.makeValues();
    console.log(this.cardValues);
    console.log("hello");
    this.shuffle();
    //this.draw(1);
  }

  makeValues() : string[] {
    var vals : string[] = [];
    for (var rank of ['3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A', '2']) {
      for (var suit of ['S', 'C', 'D', 'H']) {
          vals.push(rank + suit);
        }
    }
    return vals;
  }

  sortHand(cards : Card[]) {
    cards.sort(this.compare.bind(this));
  }
  
  compare(a : Card , b : Card) : number {
    var vals = this.makeValues();
    var valA = a.code;
    var valB = b.code;
    var iA = vals.findIndex(val => val === valA);
    var iB = vals.findIndex(val => val === valB);

    if (iA < iB) { return -1; }
    if (iA > iB) { return  1; }
    else         { return  0; }
  }

  shuffle() : string {
    this.svc.shuffle()
      .subscribe( res => {
        console.log(res);
        this.deckId = res.deck_id;
        this.remainingCardsInDeck = res.remaining;
        //this.draw(1)
      });
      return "";
  }

  addCardsToList(list : Card[], cards : Card[]) {
    for (var c of cards) {
      c.id = this.nextId(list);
      list.push(c);
    }
  }

  draw(numOfCards) : void {
    this.svc.draw(this.deckId, numOfCards)
      .subscribe( res => {
        if (res.success) {
          this.myDraw = res;
          console.log(res);
          //this.cards.push.apply(this.cards, res.cards);
          this.addCardsToList(this.cards, res.cards);
          this.drawError = {success:true};
          this.remainingCardsInDeck = res.remaining;
        }
        else {
          this.drawError = res;
          console.log(this.drawError);
        }
      });
  }

  removeById(id : number) {
    this.cards = this.cards.filter(c => c.id !== id)
  }

  log(message) : void {
    console.log(message);
  }

  clearCards() : void {
    this.cards = [];
  }

  nextId(list: Card[]) : number {
    //return Math.max.apply(Math, list.map(function(o) { return o.id; }))
    const nextId = Math.max(...list.map(o => o.id), 0);
    return nextId + 1;
  }

  selectCard(card:Card) {
    card.selected = !card.selected;
  }

}