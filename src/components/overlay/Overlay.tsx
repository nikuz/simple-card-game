
import React from 'react';
import ReactDOM from 'react-dom';
import WrapComponent from '../wrap';
import ButtonComponent from '../button';
import './style.css';

interface Props {
    title: string,
    text: string,
    buttonText: string,
    onClick: () => any,
}

export default function Overlay(props: Props) {
    return ReactDOM.createPortal(
        (
            <WrapComponent className="overlay">
                <div className="blocker" />
                <div className="overlay-content">
                    <h1 className="overlay-title">{props.title}</h1>
                    <p className="overlay-text">{props.text}</p>
                    <ButtonComponent text={props.buttonText} onClick={props.onClick} />
                </div>
            </WrapComponent>
        ),
        document.body
    );
}