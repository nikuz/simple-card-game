
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
