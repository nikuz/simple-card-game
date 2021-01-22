
import { AppState } from './types';
import { SideSelection } from '../types';

const emptySelection: SideSelection = {};

const initialState: AppState = {
    cardsPreloaded: false,
    leftSide: emptySelection,
    leftScore: 0,
    rightSide: emptySelection,
    rightScore: 0,
    fullAutoPlay: false,
    cardsRevealed: false,
    gameOver: false,
};

export default initialState;
