
import {
    SET_CARDS_PRELOADED,
    SET_LEFT_SIDE_SELECTION,
    INCREASE_LEFT_SCORE,
    SET_RIGHT_SIDE_SELECTION,
    INCREASE_RIGHT_SCORE,
    SET_ROUND_WINNER,
    TOGGLE_CARD_REVEALED,
    TOGGLE_FULL_AUTOPLAY,
    SET_GAME_OVER,
    RESTART,
} from './actions';
import {
    SideEnum,
    SideSelection,
    WinnerEnum
} from '../types';

export interface AppState {
    cardsPreloaded: boolean,
    leftSide: SideSelection,
    leftScore: number,
    rightSide: SideSelection,
    rightScore: number,
    firstAttack?: SideEnum,
    roundWinner?: WinnerEnum,
    fullAutoPlay: boolean,
    cardsRevealed: boolean,
    gameOver: boolean,
}

interface SetCardsPreloaded {
    type: typeof SET_CARDS_PRELOADED,
    payload: boolean,
}

interface SetLeftSideSelection {
    type: typeof SET_LEFT_SIDE_SELECTION,
    payload: SideSelection,
}

interface IncreaseLeftScore {
    type: typeof INCREASE_LEFT_SCORE,
}

interface SetRightSideSelection {
    type: typeof SET_RIGHT_SIDE_SELECTION,
    payload: SideSelection,
}

interface IncreaseRightScore {
    type: typeof INCREASE_RIGHT_SCORE,
}

interface SetRoundWinner {
    type: typeof SET_ROUND_WINNER,
    payload?: WinnerEnum,
}

interface ToggleCardRevealed {
    type: typeof TOGGLE_CARD_REVEALED,
    payload?: WinnerEnum,
}

interface ToggleAutoplay {
    type: typeof TOGGLE_FULL_AUTOPLAY,
    payload?: WinnerEnum,
}

interface SetGameOver {
    type: typeof SET_GAME_OVER,
}

interface Restart {
    type: typeof RESTART,
}

export type Action = SetCardsPreloaded
    | SetLeftSideSelection
    | IncreaseLeftScore
    | SetRightSideSelection
    | IncreaseRightScore
    | SetRoundWinner
    | ToggleCardRevealed
    | ToggleAutoplay
    | SetGameOver
    | Restart;
