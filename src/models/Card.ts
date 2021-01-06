
interface Props {
    id: string,
    rank: number,
    rankId: string,
}

export default class Card {
    constructor(props: Props) {
        this.id = props.id;
        this.rank = props.rank;
        this.rankId = props.rankId;
        this.front = `/cards/${props.id}.png`;
        this.back = `/cards/blue_back.png`;
    }

    rank: number;

    rankId: string;

    id: string;

    front: string;

    back: string;
}