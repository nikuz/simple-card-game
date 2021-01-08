
import { Color } from '../types';

interface Props {
    id: string,
    rank: number,
    rankId: string,
    color: Color,
}

export default class Card {
    constructor(props: Props) {
        this.id = props.id;
        this.rank = props.rank;
        this.rankId = props.rankId;
        this.front = `/cards/${props.id}.png`;
        this.back = `/cards/${props.color}_back.png`;
        this.color = props.color;
    }

    rank: number;

    rankId: string;

    id: string;

    front: string;

    back: string;

    color: Color;
}