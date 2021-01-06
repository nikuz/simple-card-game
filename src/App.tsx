
import React, { useRef, useState, useEffect } from 'react';
import DeckComponent from './components/deck';
import TableComponent from './components/table';
import WrapComponent from './components/wrap';
import OverlayComponent from './components/overlay';
import DeckModel from './models/Deck';
import CardModel from './models/Card';
import type { DeckPosition } from './types';
import './style.css';

const emptyCard = new CardModel({
    id: '',
    rank: -1,
    rankId: '',
});

function App() {
    let leftDeck = useRef(new DeckModel());
    let rightDeck = useRef(new DeckModel());
    const [leftCard, setLeftCard] = useState(emptyCard);
    const [rightCard, setRightCard] = useState(emptyCard);
    const [leftFirst, setLeftFirst] = useState(false);
    const [leftScore, setLeftScore] = useState(0);
    const [rightScore, setRightScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const cardChooseHandler = (position: DeckPosition, cardId: string) => {
        if (position === 'left') {
            const card = leftDeck.current.pullCardById(cardId);
            if (card) {
                setLeftCard(card);
                if (rightCard.rankId === '') {
                    setLeftFirst(true);
                }
            }
        } else {
            const card = rightDeck.current.pullCardById(cardId);
            if (card) {
                setRightCard(card);
                if (leftCard.rankId === '') {
                    setLeftFirst(false);
                }
            }
        }
    };

    const restart = () => {
        leftDeck.current.collect();
        rightDeck.current.collect();
        setLeftScore(0);
        setRightScore(0);
        setGameOver(false);
    };

    useEffect(() => {
        const refreshTableTimer = setInterval(() => {
            if (leftCard.rank !== -1 && rightCard.rank !== -1) {
                if (leftCard.rank > rightCard.rank) {
                    setLeftScore(leftScore + 1);
                } else if (leftCard.rank < rightCard.rank) {
                    setRightScore(rightScore + 1);
                }
                setLeftCard(emptyCard);
                setRightCard(emptyCard);
            }
            if (
                leftDeck.current.cardsInDeck.length === 0
                && rightDeck.current.cardsInDeck.length === 0
            ) {
                setGameOver(true);
            }
        }, 1000);
        return () => clearInterval(refreshTableTimer);
    }, [leftCard, rightCard, leftScore, rightScore]);

    let gameOverText = '';
    if (gameOver) {
        let winner;
        let winnerScore;
        if (leftScore > rightScore) {
            winner = 'left';
            winnerScore = leftScore;
        } else if (leftScore < rightScore) {
            winner = 'right';
            winnerScore = rightScore;
        }

        if (winner) {
            gameOverText = `${winner} player wins with score ${winnerScore}.`;
        } else {
            gameOverText = `The game ended in a draw.`;
        }
    }

    return (
        <WrapComponent className="app-container">
            <DeckComponent
                position="left"
                disabled={leftCard.rankId !== ''}
                list={leftDeck.current.cardsInDeck}
                onCardChoose={cardChooseHandler}
            />
            <TableComponent
                leftScore={leftScore}
                leftCard={leftCard}
                rightCard={rightCard}
                rightScore={rightScore}
                leftFirst={leftFirst}
            />
            <DeckComponent
                position="right"
                disabled={rightCard.rankId !== ''}
                list={rightDeck.current.cardsInDeck}
                onCardChoose={cardChooseHandler}
            />
            { gameOver && (
                <OverlayComponent
                    title="Game Over"
                    text={gameOverText}
                    buttonText="Restart"
                    onClick={restart}
                />
            ) }
        </WrapComponent>
    );
}

export default App;
