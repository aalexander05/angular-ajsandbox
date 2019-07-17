import { Card } from './card';

export interface Draw {
  success: boolean;
        cards: Card[];
        deck_id: string;
        remaining: number;
}
