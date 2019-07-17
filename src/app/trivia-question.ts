export interface TriviaQuestion {
  category : string;
  correct_answer : string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  answers: string[];
  type: string;
  correct: boolean;
  incorrect: boolean;
  answered: boolean;
}