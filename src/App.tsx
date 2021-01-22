
import React, {
    useReducer,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import PreloaderComponent from './components/preloader';
import DeckComponent from './components/deck';
import TableComponent from './components/table';
import WrapComponent from './components/wrap';
import OverlayComponent from './components/overlay';
import HeaderComponent from './components/header';
import DeckModel from './models/Deck';
import {
    initialAppState,
    actions,
    reducer,
} from './store';
import {
    CardRect,
    SideEnum,
    WinnerEnum,
    ColorEnum,
} from './types';
import './style.css';

const FINISH_ROUND_TIME = 1000;
const leftDeckColor = ColorEnum.green;
const rightDeckColor = ColorEnum.red;

export default function Canvas() {
    const leftDeck = useRef(new DeckModel(leftDeckColor));
    const rightDeck = useRef(new DeckModel(rightDeckColor));
    const [state, dispatch] = useReducer(reducer, initialAppState);
    const {
        leftSide,
        leftScore,
        rightSide,
        rightScore,
        roundWinner,
        fullAutoPlay,
        cardsRevealed,
        gameOver,
    } = state;

    const cardChooseHandler = useCallback((side: SideEnum, cardId: string, cardRect: CardRect) => {
        if (side === SideEnum.left) {
            const card = leftDeck.current.pullCardById(cardId);
            if (card) {
                dispatch({
                    type: actions.SET_LEFT_SIDE_SELECTION,
                    payload: {
                        card,
                        rect: cardRect,
                    },
                });
            }
        } else {
            const card = rightDeck.current.pullCardById(cardId);
            if (card) {
                dispatch({
                    type: actions.SET_RIGHT_SIDE_SELECTION,
                    payload: {
                        card,
                        rect: cardRect,
                    },
                });
            }
        }
    }, []);

    const setScore = useCallback((winner: WinnerEnum) => {
        switch (winner) {
            case WinnerEnum.left:
                dispatch({
                    type: actions.INCREASE_LEFT_SCORE,
                });
                break;
            case WinnerEnum.right:
                dispatch({
                    type: actions.INCREASE_RIGHT_SCORE,
                });
                break;
            default:
        }

        dispatch({
            type: actions.SET_ROUND_WINNER,
        });
    }, []);

    const restart = useCallback(() => {
        dispatch({
            type: actions.RESTART,
        });
        leftDeck.current.collect();
        rightDeck.current.collect();
    }, []);

    useEffect(() => {
        const finishRoundTimer = setTimeout(() => {
            if (leftSide.card && rightSide.card) {
                let winner: WinnerEnum | undefined;
                if (leftSide.card.rank > rightSide.card.rank) {
                    winner = WinnerEnum.left;
                } else if (leftSide.card.rank < rightSide.card.rank) {
                    winner = WinnerEnum.right;
                } else {
                    winner = WinnerEnum.draw;
                }
                dispatch({
                    type: actions.SET_ROUND_WINNER,
                    payload: winner,
                });
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
            dispatch({
                type: actions.SET_GAME_OVER,
            });
        }
    }, [roundWinner]);

    if (!state.cardsPreloaded) {
        return (
            <WrapComponent className="app-container">
                <PreloaderComponent
                    colors={[leftDeckColor, rightDeckColor]}
                    onLoading={() => dispatch({
                        type: actions.SET_CARDS_PRELOADED,
                        payload: true
                    })}
                />
            </WrapComponent>
        );
    }

    let gameOverText = '';
    if (gameOver) {
        let winner;
        let winnerScore;
        if (leftScore > rightScore) {
            winner = WinnerEnum.left;
            winnerScore = leftScore;
        } else if (leftScore < rightScore) {
            winner = WinnerEnum.right;
            winnerScore = rightScore;
        }

        if (winner) {
            gameOverText = `${winner} player wins with score ${winnerScore}`;
        } else {
            gameOverText = 'The game ended in a draw';
        }
    }

    return (
        <WrapComponent className="app-container">
            <HeaderComponent
                leftScore={leftScore}
                rightScore={rightScore}
                dispatch={dispatch}
            />
            <DeckComponent
                autoPlay={fullAutoPlay}
                revealed={cardsRevealed}
                side={SideEnum.left}
                disabled={!!leftSide.card}
                list={leftDeck.current.cardsInDeck}
                onCardChoose={cardChooseHandler}
            />
            <TableComponent
                leftSide={leftSide}
                rightSide={rightSide}
                onClear={setScore}
                roundWinner={roundWinner}
            />
            <DeckComponent
                autoPlay
                side={SideEnum.right}
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
