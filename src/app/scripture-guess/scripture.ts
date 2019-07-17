export interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface Scripture {
  reference: string;
  verses: Verse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

export interface CuratedScripture {
  book: string;
  chapter: number;
  verse: number;

}

export interface GameMode {

  answerCount: number;
  curatedScriptures: CuratedScripture[];

}