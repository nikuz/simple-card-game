
import React from 'react';
import cl from 'classnames';
import CardModel from '../../models/Card';
import { SizeEnum } from '../../types';
import './style.css';

interface Props extends CardModel {
    size: SizeEnum,
    open?: boolean,
}

export default function Card(props: Props) {
    if (props.id === '') {
        return null;
    }

    const cardClassName = cl('cc-image', {
        small: props.size === SizeEnum.small,
        big: props.size === SizeEnum.big,
        flexible: props.size === SizeEnum.flexible,
    });

    return (
        <div className="card-container">
            <img
                src={props.open ? props.front : props.back}
                className={cardClassName}
                alt=""
            />
        </div>
    );
}