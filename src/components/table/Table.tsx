import React, {useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import cl from 'classnames';
import CardComponent from '../card/Card';
import CardModel from '../../models/Card';
import {
    SideSelection,
    SideEnum,
    SizeEnum,
    CardRect,
    WinnerEnum,
} from '../../types';
import './style.css';

const REFRESH_TABLE_TIME = 500;

interface Props {
    leftSide: SideSelection,
    rightSide: SideSelection,
    roundWinner?: WinnerEnum,
    onClear: (roundWinner: WinnerEnum) => void,
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
        const refreshTableTimer = setTimeout(() => {
            if (roundWinner) {
                onClear(roundWinner); // eslint-disable-line react-hooks/exhaustive-deps
            }
        }, REFRESH_TABLE_TIME);
        return () => clearTimeout(refreshTableTimer);
    }, [roundWinner, onClear]);

    return (
        <div className="table-container" ref={container}>
            <TableCard
                side={SideEnum.left}
                card={leftSide.card}
                rect={leftSide.rect}
                wrapper={container.current}
                zIndex={2}
                roundWinner={roundWinner}
            />
            <TableCard
                side={SideEnum.right}
                card={rightSide.card}
                rect={rightSide.rect}
                wrapper={container.current}
                zIndex={1}
                roundWinner={roundWinner}
            />
        </div>
    );
}

interface TableCardProps {
    side: SideEnum,
    card?: CardModel,
    rect?: CardRect,
    wrapper: HTMLDivElement | null,
    zIndex: number,
    roundWinner?: WinnerEnum,
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
        if (side === SideEnum.left) {
            left -= wrapper.offsetLeft;
        } else if (side === SideEnum.right) {
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
            timeout={REFRESH_TABLE_TIME}
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
                                size={SizeEnum.flexible}
                            />
                        )}
                    </div>
                    <div className="rccc-back">
                        { card && (
                            <CardComponent
                                {...card}
                                open
                                size={SizeEnum.flexible}
                            />
                        )}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}
