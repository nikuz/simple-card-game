
import CardModel from '../models/Card';

export type Color = 'red' | 'green' | 'blue' | 'yellow' | 'gray' | 'purple';

export type Side = 'left' | 'right';

export type CardRect = {
    top: number,
    left: number,
    width: number,
    height: number,
};

export type SideSelection = {
    card?: CardModel,
    rect?: CardRect,
};

export type Winner = Side | & 'draw';
