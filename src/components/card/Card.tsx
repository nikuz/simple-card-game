
import React from 'react';
import cl from 'classnames';
import CardModel from '../../models/Card';
import './style.css';

interface Props extends CardModel {
    size: 'small' | 'big' | 'flexible',
    open?: boolean,
}

export default function Card(props: Props) {
    if (props.id === '') {
        return null;
    }

    const cardClassName = cl('cc-image', {
        small: props.size === 'small',
        big: props.size === 'big',
        flexible: props.size === 'flexible',
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