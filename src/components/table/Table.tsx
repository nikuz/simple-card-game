
import React from 'react';
import CardModel from '../../models/Card';
import CardComponent from '../card/Card';
import './style.css';

interface Props {
    leftScore: number,
    leftCard: CardModel,
    rightCard: CardModel,
    rightScore: number,
    leftFirst: boolean,
}

export default function Table(props: Props) {
    return (
        <div className="table-container">
            <div className="tc-score tcs-left">
                {props.leftScore}
            </div>
            <div
                className="tc-card-container tc-left-card"
                style={{ zIndex: props.leftFirst ? 1 : 2 }}
            >
                <CardComponent
                    {...props.leftCard}
                    open={true}
                    size="big"
                />
            </div>
            <div className="tc-score tcs-right">
                {props.rightScore}
            </div>
            <div
                className="tc-card-container tc-right-card"
                style={{ zIndex: props.leftFirst ? 2 : 1 }}
            >
                <CardComponent
                    {...props.rightCard}
                    open={true}
                    size="big"
                />
            </div>
        </div>
    );
}