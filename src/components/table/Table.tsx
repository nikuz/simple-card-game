
import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import cl from 'classnames';
import CardComponent from '../card/Card';
import CardModel from '../../models/Card';
import {
    SideSelection,
    Side,
    CardRect,
    Winner,
} from '../../types';
import './style.css';

const REFRESH_TABLE_TIME = 500;

interface Props {
    leftSide: SideSelection,
    rightSide: SideSelection,
    firstAttack?: Side,
    roundWinner?: Winner,
    onClear: (roundWinner: Winner) => void,
}

export default function Table(props: Props) {
    const {
        leftSide,
        rightSide,
        roundWinner,
        onClear,
    } = props;
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const refreshTableTimer = setInterval(() => {
            if (roundWinner) {
                onClear(roundWinner); // eslint-disable-line react-hooks/exhaustive-deps
            }
        }, REFRESH_TABLE_TIME);
        return () => clearInterval(refreshTableTimer);
    }, [roundWinner, onClear]);

    return (
        <div className="table-container" ref={container}>
            <TableCard
                side="left"
                card={leftSide.card}
                rect={leftSide.rect}
                wrapper={container.current}
                zIndex={props.firstAttack === 'left' ? 1 : 2}
                roundWinner={roundWinner}
            />
            <TableCard
                side="right"
                card={rightSide.card}
                rect={rightSide.rect}
                wrapper={container.current}
                zIndex={props.firstAttack === 'right' ? 1 : 2}
                roundWinner={roundWinner}
            />
        </div>
    );
}

interface TableCardProps {
    side: Side,
    card?: CardModel,
    rect?: CardRect,
    wrapper: HTMLDivElement | null,
    zIndex: number,
    roundWinner?: Winner,
}

function TableCard(props: TableCardProps) {
    const container = React.useRef(null);
    const {
        side,
        card,
        wrapper,
        roundWinner,
    } = props;

    const cardRect = props.rect;
    let rect = {};
    if (cardRect && wrapper !== null) {
        let left = cardRect.left;
        if (side === 'left') {
            left -= wrapper.offsetLeft;
        } else if (side === 'right') {
            left += wrapper.offsetWidth;
        }
        rect = {
            top: cardRect.top - wrapper.offsetTop,
            left,
            width: cardRect.width,
            height: cardRect.height,
        };
    }

    const className = cl('tc-card-container', {
        [`tc-${side}-card`]: side,
        [`tc-winner-${roundWinner}`]: roundWinner,
    });

    return (
        <CSSTransition
            in={card && !roundWinner}
            nodeRef={container}
            unmountOnExit
            timeout={500}
            classNames="tccc-wrapper"
        >
            <div
                ref={container}
                className={className}
                style={{
                    ...rect,
                    zIndex: props.zIndex,
                }}
            >
                <div className="tccc-inner">
                    <div className="rccc-front">
                        { card && (
                            <CardComponent
                                {...card}
                                size="flexible"
                            />
                        )}
                    </div>
                    <div className="rccc-back">
                        { card && (
                            <CardComponent
                                {...card}
                                open
                                size="flexible"
                            />
                        )}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}