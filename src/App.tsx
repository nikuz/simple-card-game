
import React, { useRef, useState, useEffect } from 'react';
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
} from './types';
import './style.css';

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
    const [gameOver, setGameOver] = useState(false);

    const cardChooseHandler = (side: Side, cardId: string, cardRect: CardRect) => {
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
            if (leftSide.card.rank !== -1 && rightSide.card.rank !== -1) {
                if (leftSide.card.rank > rightSide.card.rank) {
                    setLeftScore(leftScore + 1);
                } else if (leftSide.card.rank < rightSide.card.rank) {
                    setRightScore(rightScore + 1);
                }
                setLeftSideSelection(emptySelection);
                setRightSideSelection(emptySelection);
            }
            if (
                leftDeck.current.cardsInDeck.length === 0
                && rightDeck.current.cardsInDeck.length === 0
            ) {
                setGameOver(true);
            }
        }, 1000);
        return () => clearInterval(refreshTableTimer);
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
