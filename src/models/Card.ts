
import appParams from '../../package.json';
import { ColorEnum } from '../types';

interface Props {
    id: string,
    rank: number,
    rankId: string,
    color: ColorEnum,
}

export default class Card {
    constructor(props: Props) {
        this.id = props.id;
        this.rank = props.rank;
        this.rankId = props.rankId;
        this.front = `/${appParams.name}/cards/${props.id}.png`;
        this.back = `/${appParams.name}/cards/${props.color}_back.png`;
        this.color = props.color;
    }

    rank: number;

    rankId: string;

    id: string;

    front: string;

    back: string;

    color: ColorEnum;
}
