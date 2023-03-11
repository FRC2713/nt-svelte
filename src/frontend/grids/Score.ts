import type {NodeTypes} from "./NodeTypes";

export class Score {
    points;
    index;
    type;
    constructor(index: number, points: number, type: NodeTypes) {
        this.points = points;
        this.index = index;
        this.type = type;
    }
}