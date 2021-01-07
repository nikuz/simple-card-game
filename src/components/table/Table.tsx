
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import CardComponent from '../card/Card';
import CardModel from '../../models/Card';
import {
    SideSelection,
    Side,
    CardRect,
} from '../../types';
import './style.css';

interface Props {
    leftSide: SideSelection,
    leftScore: number,
    rightSide: SideSelection,
    rightScore: number,
    firstAttack: Side | undefined,
}

export default function Table(props: Props) {
    const {
        leftSide,
        rightSide,
    } = props;
    const container = useRef<HTMLDivElement>(null);

    return (
        <div className="table-container" ref={container}>
            <div className="tc-score tcs-left">
                {props.leftScore}
            </div>
            <TableCard
                side="left"
                card={leftSide.card}
                rect={leftSide.rect}
                wrapper={container.current}
                zIndex={props.firstAttack === 'left' ? 1 : 2}
            />
            <div className="tc-score tcs-right">
                {props.rightScore}
            </div>
            <TableCard
                side="right"
                card={rightSide.card}
                rect={rightSide.rect}
                wrapper={container.current}
                zIndex={props.firstAttack === 'right' ? 1 : 2}
            />
        </div>
    );
}

interface TableCardProps {
    side: Side,
    card: CardModel,
    rect: CardRect,
    wrapper: HTMLDivElement | null,
    zIndex: number,
}

function TableCard(props: TableCardProps) {
    const container = React.useRef(null);
    const {
        side,
        card,
        wrapper,
    } = props;

    const cardRect = props.rect;
    let rect = {};
    if (wrapper !== null) {
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

    return (
        <CSSTransition
            in={card.rankId !==''}
            nodeRef={container}
            unmountOnExit
            timeout={500}
            classNames="tccc-wrapper"
        >
            <div
                ref={container}
                className={`tc-card-container tc-${side}-card`}
                style={{
                    ...rect,
                    zIndex: props.zIndex,
                }}
            >
                <div className="tccc-inner">
                    <div className="rccc-front">
                        <CardComponent
                            {...card}
                            size="flexible"
                        />
                    </div>
                    <div className="rccc-back">
                        <CardComponent
                            {...card}
                            open={true}
                            size="flexible"
                        />
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}