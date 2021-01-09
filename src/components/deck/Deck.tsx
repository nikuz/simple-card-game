
import React, { useRef, useEffect, useCallback } from 'react';
import cl from 'classnames';
import CardModel from '../../models/Card';
import CardComponent from '../card';
import { SCREEN_BASE_HEIGHT } from '../../constants';
import {
    fromRemToPx,
    getCssProperty,
} from '../../utils';
import {
    SideEnum,
    SizeEnum,
    CardRect,
} from '../../types';
import './style.css';

const cardWidth = 10; // in rem
const deckHeight = (SCREEN_BASE_HEIGHT - cardWidth); // in rem

interface Props {
    autoPlay?: boolean,
    side: SideEnum,
    disabled: boolean,
    revealed?: boolean,
    list: CardModel[],
    onCardChoose: (side: SideEnum, cardId: string, rect: CardRect) => void,
}

export default function Deck(props: Props) {
    const {
        autoPlay,
        disabled,
        list,
        side,
    } = props;

    const containerClassName = cl('deck-container', `dc-${side}`, {
        disabled,
    });

    const cardMargin = deckHeight / (list.length - 1);
    let padding = parseInt(getCssProperty(['hover-padding'])[0],10);

    let autoPlayCard: number;
    if (autoPlay && !disabled) {
        autoPlayCard = Math.floor(Math.random() * list.length);
    }

    return (
        <div className={containerClassName}>
            {list.map((card: CardModel, i) => (
                <DeckCard
                    key={card.id}
                    side={side}
                    card={card}
                    autoPlay={i === autoPlayCard}
                    revealed={props.revealed}
                    disabled={disabled}
                    position={i * cardMargin}
                    padding={padding || 0}
                    onClick={(rect: CardRect) => {
                        props.onCardChoose(side, card.id, rect);
                    }}
                />
            ))}
            { disabled && <div className="blocker" /> }
        </div>
    );
}

interface DeckCardProps {
    side: SideEnum,
    card: CardModel,
    autoPlay: boolean,
    revealed?: boolean,
    disabled: boolean,
    position: number,
    padding: number,
    onClick: (rect: CardRect) => any,
}

function DeckCard(props: DeckCardProps) {
    const {
        autoPlay,
        revealed,
        disabled,
        onClick,
        padding,
        side,
    } = props;
    const element = useRef<HTMLDivElement>(null);
    const translateY = 2.65;

    const clickHandler = useCallback(() => {
        if (element.current !== null) {
            const el = element.current;
            let left = el.offsetLeft;

            if (side === SideEnum.right) {
                left -= fromRemToPx(padding);
            }

            const rect: CardRect = {
                top: el.offsetTop - fromRemToPx(translateY),
                left,
                width: el.offsetWidth,
                height: el.offsetHeight,
            };
            onClick(rect);
        }
    }, [element, padding, side, onClick]);

    useEffect(() => {
        const autoSelectFrame = setTimeout(() => {
            if (autoPlay && !disabled) {
                clickHandler();
            }
        }, 10);
        return () => clearTimeout(autoSelectFrame);
    }, [autoPlay, disabled, clickHandler]);

    return (
        <div
            ref={element}
            className="dc-item"
            style={{
                top: `${props.position}rem`,
                transform: `translate(-50%, -${translateY}rem) rotate(-90deg)`,
            }}
            onClick={() => {
                if (!autoPlay) {
                    clickHandler();
                }
            }}
        >
            <CardComponent
                {...props.card}
                open={revealed}
                size={SizeEnum.small}
            />
        </div>
    );
}