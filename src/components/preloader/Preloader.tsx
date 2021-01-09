
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Loading from '../loading';
import DeckModel from '../../models/Deck';
import CardModel from '../../models/Card';
import { ColorEnum } from '../../types';
import './style.css';

interface Props {
    colors: ColorEnum[],
    onLoading: () => void,
}

export default function Preloader(props: Props) {
    const {
        colors,
        onLoading,
    } = props;
    const firstDeck = useRef(new DeckModel(colors[0]));
    const secondDeck = useRef(new DeckModel(colors[1]));
    const cardsList = firstDeck.current.cards;
    const [loadingCounter, setLoadingCounter] = useState(0);

    const totalCardsAmount = cardsList.length + 2;

    useEffect(() => {
        if (loadingCounter === totalCardsAmount) {
            onLoading();
        }
    }, [loadingCounter, totalCardsAmount, onLoading]);

    const imageLoadingHandler = useCallback(() => {
        setLoadingCounter(loadingCounter + 1);
    }, [loadingCounter]);

    const progress = Math.round(loadingCounter / (totalCardsAmount / 100));

    return (
        <div className="preloader-container blocker">
            <Loading />
            <div className="pc-progress">
                {progress || 0}
                %
            </div>
            <div className="preloader-deck">
                { cardsList.map((card: CardModel) => (
                    <PreloaderCard
                        key={card.id}
                        src={card.front}
                        onLoad={imageLoadingHandler}
                        onError={onLoading}
                    />
                )) }
                <PreloaderCard
                    src={cardsList[0].back}
                    onLoad={imageLoadingHandler}
                    onError={onLoading}
                />
                <PreloaderCard
                    src={secondDeck.current.cards[0].back}
                    onLoad={imageLoadingHandler}
                    onError={onLoading}
                />
            </div>
        </div>
    );
}

interface CardProps {
    src: string,
    onLoad: () => void,
    onError: () => void,
}

function PreloaderCard(props: CardProps) {
    return (
        <img
            src={props.src}
            className="pcd-card"
            alt=""
            onLoad={props.onLoad}
            onError={props.onError}
        />
    );
}