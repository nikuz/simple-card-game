
import React, { useRef } from 'react';
import cl from 'classnames';
import CardModel from '../../models/Card';
import CardComponent from '../card';
import { SCREEN_BASE_HEIGHT } from '../../constants';
import {
    fromRemToPx,
    getCssProperty,
} from '../../utils';
import type {
    Side,
    CardRect,
} from '../../types';
import './style.css';

const cardWidth = 10; // in rem
const deckHeight = (SCREEN_BASE_HEIGHT - cardWidth); // in rem

interface Props {
    side: Side,
    disabled: boolean,
    list: CardModel[],
    onCardChoose: (side: Side, cardId: string, rect: CardRect) => any,
}

export default function Deck(props: Props) {
    const containerClassName = cl('deck-container', `dc-${props.side}`, {
        disabled: props.disabled,
    });

    const cardMargin = deckHeight / (props.list.length - 1);
    const [padding] = getCssProperty(['hover-padding']);

    return (
        <div className={containerClassName}>
            {props.list.map((card: CardModel, i) => (
                <DeckCard
                    key={card.id}
                    side={props.side}
                    card={card}
                    position={i * cardMargin}
                    padding={parseInt(padding, 10)}
                    onClick={(rect: CardRect) => {
                        props.onCardChoose(props.side, card.id, rect);
                    }}
                />
            ))}
            { props.disabled && <div className="blocker" /> }
        </div>
    );
}

interface DeckCardProps {
    side: Side,
    card: CardModel,
    position: number,
    padding: number,
    onClick: (rect: CardRect) => any,
}

function DeckCard(props: DeckCardProps) {
    const element = useRef<HTMLDivElement>(null);
    const translateY = 2.65;

    return (
        <div
            ref={element}
            className="dc-item"
            style={{
                top: `${props.position}rem`,
                transform: `translate(-50%, -${translateY}rem) rotate(-90deg)`,
            }}
            onClick={() => {
                if (element.current !== null) {
                    const el = element.current;
                    let left = el.offsetLeft;

                    if (props.side === 'right') {
                        left -= fromRemToPx(props.padding);
                    }

                    const rect: CardRect = {
                        top: el.offsetTop - fromRemToPx(translateY),
                        left,
                        width: el.offsetWidth,
                        height: el.offsetHeight,
                    };
                    props.onClick(rect);
                }
            }}
        >
            <CardComponent size="small" {...props.card} />
        </div>
    );
}