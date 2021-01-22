
import Card from './Card';
import { arrayShuffle } from '../utils';
import { ColorEnum } from '../types';

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['C', 'D', 'H', 'S'];

export default class Deck {
    constructor(color: ColorEnum) {
        for (let i = 0, l = ranks.length; i < l; i++) {
            this.populateRank(i, color);
        }
        this.cardsInDeck = [ ...this.cards ];
        this.shuffle();
    }

    cards: Card[] = [];

    cardsInDeck: Card[] = [];

    private populateRank = (rank: number, color: ColorEnum) => {
        for (let j = 0, jl = suits.length; j < jl; j++) {
            const id = `${ranks[rank]}${suits[j]}`;
            this.cards.push(new Card({
                rank,
                rankId: ranks[rank],
                id,
                color,
            }));
        }
    };

    shuffle = () => {
        this.cardsInDeck = arrayShuffle(this.cardsInDeck);
    };

    pullCardByIndex = (index: number): Card | null => {
        if (index < 0 || index > this.cardsInDeck.length) {
            return null;
        }

        return this.cardsInDeck.splice(index, 1)[0] || null;
    };

    pullCardById = (id: string): Card | null => {
        const cardIndex = this.cardsInDeck.findIndex((item) => item.id === id);

        if (cardIndex !== -1) {
            return this.cardsInDeck.splice(cardIndex, 1)[0] || null;

        }

        return null;
    };

    collect = () => {
        this.cardsInDeck = [...this.cards];
        this.shuffle();
    };
}
