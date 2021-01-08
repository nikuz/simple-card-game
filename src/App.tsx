
import React, { useRef, useState, useEffect, useCallback } from 'react';
import DeckComponent from './components/deck';
import TableComponent from './components/table';
import WrapComponent from './components/wrap';
import OverlayComponent from './components/overlay';
import DeckModel from './models/Deck';
import CardModel from './models/Card';
import type {
    SideSelection,
    Side,
    CardRect,
    Winner,
} from './types';
import './style.css';

const FINISH_ROUND_TIME = 1000;

const emptyCard = new CardModel({
    id: '',
    rank: -1,
    rankId: '',
});

const emptyRect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
};

const emptySelection: SideSelection = {
    card: emptyCard,
    rect: emptyRect,
};

function App() {
    let leftDeck = useRef(new DeckModel());
    let rightDeck = useRef(new DeckModel());
    const [leftSide, setLeftSideSelection] = useState<SideSelection>(emptySelection);
    const [leftScore, setLeftScore] = useState(0);
    const [rightSide, setRightSideSelection] = useState<SideSelection>(emptySelection);
    const [rightScore, setRightScore] = useState(0);
    const [firstAttack, setFirstAttack] = useState<Side>();
    const [roundWinner, setRoundWinner] = useState<Winner>();
    const [gameOver, setGameOver] = useState(false);

    const cardChooseHandler = useCallback((side: Side, cardId: string, cardRect: CardRect) => {
        if (side === 'left') {
            const card = leftDeck.current.pullCardById(cardId);
            if (card) {
                setLeftSideSelection({
                    card: card,
                    rect: cardRect,
                });
                if (rightSide.card.rankId === '') {
                    setFirstAttack('left');
                }
            }
        } else {
            const card = rightDeck.current.pullCardById(cardId);
            if (card) {
                setRightSideSelection({
                    card: card,
                    rect: cardRect,
                });
                if (leftSide.card.rankId === '') {
                    setFirstAttack('right');
                }
            }
        }
    }, [leftSide.card.rankId, rightSide.card.rankId]);

    const setScore = useCallback((winner: Winner) => {
        switch (winner) {
            case "left":
                setLeftScore(leftScore + 1);
                break;
            case "right":
                setRightScore(rightScore + 1);
                break;
            default:
        }

        setRoundWinner(undefined);
        setLeftSideSelection(emptySelection);
        setRightSideSelection(emptySelection);

        if (
            leftDeck.current.cardsInDeck.length === 0
            && rightDeck.current.cardsInDeck.length === 0
        ) {
            setGameOver(true);
        }
    }, [leftScore, rightScore]);

    const restart = useCallback(() => {
        leftDeck.current.collect();
        rightDeck.current.collect();
        setLeftScore(0);
        setRightScore(0);
        setGameOver(false);
    }, []);

    useEffect(() => {
        const finishRoundTimer = setInterval(() => {
            if (leftSide.card.rank !== -1 && rightSide.card.rank !== -1) {
                let winner: Winner | undefined;
                if (leftSide.card.rank > rightSide.card.rank) {
                    winner = 'left';
                } else if (leftSide.card.rank < rightSide.card.rank) {
                    winner = 'right';
                } else {
                    winner = 'draw';
                }
                setRoundWinner(winner);
            }
        }, FINISH_ROUND_TIME);
        return () => clearInterval(finishRoundTimer);
    }, [leftSide, rightSide, leftScore, rightScore]);

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
                side="left"
                disabled={leftSide.card.rankId !== ''}
                list={leftDeck.current.cardsInDeck}
                onCardChoose={cardChooseHandler}
            />
            <TableComponent
                leftSide={leftSide}
                leftScore={leftScore}
                rightSide={rightSide}
                rightScore={rightScore}
                firstAttack={firstAttack}
                onClear={setScore}
                roundWinner={roundWinner}
            />
            <DeckComponent
                side="right"
                disabled={rightSide.card.rankId !== ''}
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
