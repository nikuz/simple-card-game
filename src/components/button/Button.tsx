
import React from 'react';
import cl from 'classnames';
import './style.css';

interface Props {
    text: string,
    className?: string | { [className: string]: any },
    onClick: () => any,
}

export default function Button(props: Props) {
    return (
        <button
            type="button"
            className={cl('button', props.className)}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}