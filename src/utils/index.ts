
import {
    SCREEN_BASE_WIDTH,
    SCREEN_BASE_HEIGHT,
} from '../constants';

// https://bost.ocks.org/mike/shuffle/
export function arrayShuffle<T>(array: T[]): T[] {
    const copy: T[] = [];
    let n = array.length
    let i;

    while (n) {
        i = Math.floor(Math.random() * array.length);
        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }

    return copy;
}

export const getCssProperty = (
    property: string[],
    element?: HTMLElement | null
): string[] => {
    const result: string[] = [];

    if (!document.documentElement) {
        return result;
    }

    const styles = getComputedStyle(element || document.documentElement);

    property.forEach((item: string) => {
        result.push(styles.getPropertyValue(`--${item}`));
    });

    return result;
};

let dWidth = window.innerWidth;
let dHeight = window.innerHeight;

window.addEventListener('resize', () => {
    dWidth = window.innerWidth;
    dHeight = window.innerHeight;
});

export const fromPxToRem = (sizeInPixels: number): number => {
    const fontSize = Math.min((dWidth / SCREEN_BASE_WIDTH), (dHeight / SCREEN_BASE_HEIGHT));

    return sizeInPixels / fontSize;
};

export const fromRemToPx = (sizeInRems: number): number => {
    const fontSize = Math.min((dWidth / SCREEN_BASE_WIDTH), (dHeight / SCREEN_BASE_HEIGHT));

    return sizeInRems * fontSize;
};
