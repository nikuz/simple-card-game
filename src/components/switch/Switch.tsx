
import React from 'react';
import './style.css';

interface Props {
    text: string,
    onChange: (value: boolean) => void,
}

export default function Switch(props: Props) {
    return (
        <label className="switch-container">
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
