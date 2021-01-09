
import Card from './Card';
import { arrayShuffle } from '../utils';
import { Color } from '../types';

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['C', 'D', 'H', 'S'];

export default class Deck {
    constructor(color: Color) {
        for (let i = 0, l = ranks.length; i < l; i++) {
            for (let j = 0, jl = suits.length; j < jl; j++) {
                const id = `${ranks[i]}${suits[j]}`;
                this.cards.push(new Card({
                    rank: i,
                    rankId: ranks[i],
                    id,
                    color,
                }));
            }
        }
        this.cardsInDeck = [ ...this.cards ];
        this.shuffle();
    }

    cards: Card[] = [];

    cardsInDeck: Card[] = [];

    shuffle = () => {
        this.cardsInDeck = arrayShuffle(this.cardsInDeck);
    };

    pullCardByIndex = (index: number): Card | undefined => {
        if (index < 0 || index > this.cardsInDeck.length) {
            return;
        }

        return this.cardsInDeck.splice(index, 1)[0];
    };

    pullCardById = (id: string): Card | undefined => {
        const cardIndex = this.cardsInDeck.findIndex((item) => item.id === id);

        if (cardIndex !== -1) {
            return this.cardsInDeck.splice(cardIndex, 1)[0];
        }

        return undefined;
    };

    collect = () => {
        this.cardsInDeck = [...this.cards];
        this.shuffle();
    };
}