import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http'
import { TriviaService } from './trivia.service';
import { CardsComponent } from './cards/cards.component';
import { CardService } from './cards/card.service';
import { ReactiveComponent } from './reactive/reactive.component';
import { ScriptureGuessComponent } from './scripture-guess/scripture-guess.component';
import { ScriptureService } from './scripture-guess/scripture.service';
import { ScriptureStartComponent } from './scripture-start/scripture-start.component';


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'trivia', component: AboutComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'reactive', component: ReactiveComponent},
      { path: 'guess-that-scripture', component: ScriptureStartComponent }
    ]) 
  ],
  declarations: [ AppComponent, HelloComponent, MenuComponent, HomeComponent, AboutComponent, CardsComponent, ReactiveComponent, ScriptureGuessComponent, ScriptureStartComponent ],
  bootstrap:    [ AppComponent ],
  providers: [TriviaService, CardService, ScriptureService]
})
export class AppModule { }
