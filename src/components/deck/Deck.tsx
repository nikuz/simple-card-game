
import React from 'react';
import cl from 'classnames';
import CardModel from '../../models/Card';
import CardComponent from '../card';
import { SCREEN_BASE_HEIGHT } from '../../constants';
import type { DeckPosition } from '../../types';
import './style.css';

const cardWidth = 10; // in rem
const deckHeight = (SCREEN_BASE_HEIGHT - cardWidth); // in rem

interface Props {
    position: DeckPosition,
    disabled: boolean,
    list: CardModel[],
    onCardChoose: (position: DeckPosition, cardId: string) => any,
}

export default function Deck(props: Props) {
    const containerClassName = cl('deck-container', `dc-${props.position}`, {
        disabled: props.disabled,
    });

    const cardMargin = deckHeight / props.list.length;

    return (
        <div className={containerClassName}>
            {props.list.map((card: CardModel, i) => (
                <div
                    key={card.id}
                    className="dc-item"
                    style={{ top: `${i * cardMargin}rem` }}
                    onClick={() => {
                        props.onCardChoose(props.position, card.id);
                    }}
                >
                    <CardComponent size="small" {...card} />
                </div>
            ))}
            { props.disabled && <div className="blocker" /> }
        </div>
    );
}