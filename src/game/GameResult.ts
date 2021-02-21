import { EPlayer } from "../player/EPlayer";

export class GameResult {
    constructor(public winner: EPlayer, public cell: number[]) {}
}
