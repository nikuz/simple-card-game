
import React from 'react';
import ReactDOM from 'react-dom';
import WrapContainer from '../wrap';
import ButtonContainer from '../button';
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
            <WrapContainer className="overlay">
                <div className="blocker" />
                <div className="overlay-content">
                    <h1 className="overlay-title">{props.title}</h1>
                    <p className="overlay-text">{props.text}</p>
                    <ButtonContainer text={props.buttonText} onClick={props.onClick} />
                </div>
            </WrapContainer>
        ),
        document.body
    );
}