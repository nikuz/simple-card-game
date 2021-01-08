
import React from 'react';
import SwitchComponent from '../switch';
import './style.css';

interface Props {
    leftScore: number,
    rightScore: number,
    onChangeAutoPlay: (value: boolean) => void,
    onChangeRevealCards: (value: boolean) => void,
}

export default function Header(props: Props) {
    return (
        <div className="header-container">
            <div className="hc-score hcs-left">
                {props.leftScore}
            </div>
            <SwitchComponent
                text="Reveal cards"
                className="hc-switch"
                onChange={props.onChangeRevealCards}
            />
            <SwitchComponent
                text="Autoplay"
                className="hc-switch"
                onChange={props.onChangeAutoPlay}
            />
            <div className="hc-score hcs-right">
                {props.rightScore}
            </div>
        </div>
    );
}