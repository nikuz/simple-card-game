
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Loading from '../loading';
import DeckModel from '../../models/Deck';
import CardModel from '../../models/Card';
import './style.css';

const TIMEOUT = 5000;

interface Props {
    onLoading: () => void,
}

export default function Preloader(props: Props) {
    const { onLoading } = props;
    const deck = useRef(new DeckModel('green'));
    const cardsList = deck.current.cards;
    const [loadingCounter, setLoadingCounter] = useState(0);

    useEffect(() => {
        if (loadingCounter === cardsList.length - 1) {
            onLoading();
        }
        const timeoutTimer = setTimeout(() => {
            onLoading();
        }, TIMEOUT);
        return () => clearTimeout(timeoutTimer);
    }, [loadingCounter, cardsList.length, onLoading]);

    const imageLoadingHandler = useCallback(() => {
        setLoadingCounter(loadingCounter + 1);
    }, [loadingCounter]);

    return (
        <div className="preloader-container blocker">
            <Loading size="small" />
            <div className="preloader-deck">
                { cardsList.map((card: CardModel) => (
                    <img
                        key={card.id}
                        src={card.front}
                        className="pcd-card"
                        alt=""
                        onLoad={imageLoadingHandler}
                        onError={onLoading}
                    />
                )) }
            </div>
        </div>
    )
}