
import React from 'react';
import SwitchComponent from '../switch';
import { actions, Action } from '../../store';
import './style.css';

interface Props {
    leftScore: number,
    rightScore: number,
    dispatch: (action: Action) => void,
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
                onChange={() => {
                    props.dispatch({
                        type: actions.TOGGLE_CARD_REVEALED,
                    });
                }}
            />
            <SwitchComponent
                text="Autoplay"
                className="hc-switch"
                onChange={() => {
                    props.dispatch({
                        type: actions.TOGGLE_FULL_AUTOPLAY,
                    });
                }}
            />
            <div className="hc-score hcs-right">
                {props.rightScore}
            </div>
        </div>
    );
}
