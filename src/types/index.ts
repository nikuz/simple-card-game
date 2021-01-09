
import CardModel from '../models/Card';

export enum ColorEnum {
    red = 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow',
    gray = 'gray',
    purple = 'purple',
}

export enum SideEnum {
    left = 'left',
    right = 'right',
}

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

export enum WinnerEnum {
    left = 'left',
    right = 'right',
    draw = 'draw',
}

export enum SizeEnum {
    small = 'small',
    big = 'big',
    flexible = 'flexible',
}