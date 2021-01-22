
import initialState from './initial-state';
import {
    INCREASE_LEFT_SCORE,
    INCREASE_RIGHT_SCORE,
    RESTART,
    SET_CARDS_PRELOADED,
    SET_LEFT_SIDE_SELECTION,
    SET_RIGHT_SIDE_SELECTION,
    SET_ROUND_WINNER,
    TOGGLE_FULL_AUTOPLAY,
    TOGGLE_CARD_REVEALED,
    SET_GAME_OVER,
} from './actions';
import {Action, AppState,} from './types';

export default function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case SET_CARDS_PRELOADED:
            return {
                ...state,
                cardsPreloaded: action.payload,
            };

        case SET_LEFT_SIDE_SELECTION:
            return {
                ...state,
                leftSide: action.payload,
            };

        case INCREASE_LEFT_SCORE:
            return {
                ...state,
                leftScore: state.leftScore + 1,
            };

        case SET_RIGHT_SIDE_SELECTION:
            return {
                ...state,
                rightSide: action.payload,
            };

        case INCREASE_RIGHT_SCORE:
            return {
                ...state,
                rightScore: state.rightScore + 1,
            };

        case SET_ROUND_WINNER:
            return {
                ...state,
                roundWinner: action.payload,
                leftSide: !!action.payload ? state.leftSide : initialState.leftSide,
                rightSide: !!action.payload ? state.rightSide : initialState.rightSide,
            };

        case TOGGLE_CARD_REVEALED:
            return {
                ...state,
                cardsRevealed: !state.cardsRevealed,
            };

        case TOGGLE_FULL_AUTOPLAY:
            return {
                ...state,
                fullAutoPlay: !state.fullAutoPlay,
            };

        case SET_GAME_OVER:
            return {
                ...state,
                gameOver: true,
            };

        case RESTART:
            return {
                ...state,
                leftScore: 0,
                rightScore: 0,
                gameOver: false,
            };

        default:
            throw new Error();
    }
}
