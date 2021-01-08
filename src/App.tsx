
import React, { useRef, useState, useEffect, useCallback } from 'react';
import PreloaderComponent from './components/preloader';
import DeckComponent from './components/deck';
import TableComponent from './components/table';
import WrapComponent from './components/wrap';
import OverlayComponent from './components/overlay';
import HeaderComponent from './components/header';
import DeckModel from './models/Deck';
import type {
    SideSelection,
    Side,
    CardRect,
    Winner,
} from './types';
import './style.css';

const FINISH_ROUND_TIME = 1000;

const emptySelection: SideSelection = {};

export default function Canvas() {
    const leftDeck = useRef(new DeckModel('green'));
    const rightDeck = useRef(new DeckModel('red'));
    const [cardsPreloaded, setCardsPreloaded] = useState(false);
    const [leftSide, setLeftSideSelection] = useState<SideSelection>(emptySelection);
    const [leftScore, setLeftScore] = useState(0);
    const [rightSide, setRightSideSelection] = useState<SideSelection>(emptySelection);
    const [rightScore, setRightScore] = useState(0);
    const [firstAttack, setFirstAttack] = useState<Side>();
    const [roundWinner, setRoundWinner] = useState<Winner>();
    const [fullAutoPlay, setFullAutoPlay] = useState(false);
    const [cardsRevealed, setCardsRevealed] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const cardChooseHandler = useCallback((side: Side, cardId: string, cardRect: CardRect) => {
        if (side === 'left') {
            const card = leftDeck.current.pullCardById(cardId);
            if (card) {
                setLeftSideSelection({
                    card: card,
                    rect: cardRect,
                });
                if (!rightSide.card) {
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
                if (!leftSide.card) {
                    setFirstAttack('right');
                }
            }
        }
    }, [leftSide.card, rightSide.card]);

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
    }, [leftScore, rightScore]);

    const restart = useCallback(() => {
        leftDeck.current.collect();
        rightDeck.current.collect();
        setLeftScore(0);
        setRightScore(0);
        setGameOver(false);
    }, []);

    useEffect(() => {
        const finishRoundTimer = setTimeout(() => {
            if (leftSide.card && rightSide.card) {
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
        return () => clearTimeout(finishRoundTimer);
    }, [leftSide.card, rightSide.card, leftScore, rightScore]);

    useEffect(() => {
        if (
            !roundWinner
            && leftDeck.current.cardsInDeck.length === 0
            && rightDeck.current.cardsInDeck.length === 0
        ) {
            setGameOver(true);
        }
    }, [roundWinner]);

    if (!cardsPreloaded) {
        return <PreloaderComponent onLoading={() => setCardsPreloaded(true)} />;
    }

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
            gameOverText = `${winner} player wins with score ${winnerScore}`;
        } else {
            gameOverText = `The game ended in a draw`;
        }
    }

    return (
        <WrapComponent className="app-container">
            <HeaderComponent
                leftScore={leftScore}
                rightScore={rightScore}
                onChangeAutoPlay={setFullAutoPlay}
                onChangeRevealCards={setCardsRevealed}
            />
            <DeckComponent
                autoPlay={fullAutoPlay}
                revealed={cardsRevealed}
                side="left"
                disabled={!!leftSide.card}
                list={leftDeck.current.cardsInDeck}
                onCardChoose={cardChooseHandler}
            />
            <TableComponent
                leftSide={leftSide}
                rightSide={rightSide}
                firstAttack={firstAttack}
                onClear={setScore}
                roundWinner={roundWinner}
            />
            <DeckComponent
                autoPlay
                side="right"
                disabled={!!rightSide.card}
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
