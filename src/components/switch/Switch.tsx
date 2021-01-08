
import React from 'react';
import cl from 'classnames';
import './style.css';

interface Props {
    text: string,
    className?: string | { [className: string]: any },
    onChange: (value: boolean) => void,
}

export default function Switch(props: Props) {
    const className = cl('switch-container', props.className);
    return (
        <label className={className}>
            <div className="switch">
                <input
                    type="checkbox"
                    onChange={(e) => {
                        props.onChange(e.target.checked);
                    }}
                />
                <span className="slider" />
            </div>
            <p className="switch-text">{props.text}</p>
        </label>
    );
};
