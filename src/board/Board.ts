import Joi, { ValidationError } from "joi";
import { EPlayer } from "../player/EPlayer";
import { IBoardData } from "./IBoard";

export class Board {
    public static readonly DEFAULT_BOARD_SIZE = 3;

    constructor(public size: number = Board.DEFAULT_BOARD_SIZE, public data: IBoardData) {
        this.validate();
    }

    private validate(): void {
        Joi.assert(this.size, Joi.number().required());
        Joi.assert(this.data, Joi.array().required());

        Board.assertBoardValid(this.size, this.data.length);

        let freeCells = 0;

        let oCells = 0;
        let xCells = 0;

        for (const row of this.data) {
            Board.assertBoardValid(this.size, row.length);

            for (let i = 0; i < row.length; i++) {
                let cell = row[i];

                let playerKey = cell.toUpperCase();

                if (playerKey === "") {
                    playerKey = EPlayer.BLANK.toUpperCase();
                }

                row[i] = cell = EPlayer[playerKey as never];

                if (!cell) {
                    throw new ValidationError(`Unknown cell value: ${playerKey}`, "", null);
                }

                if (cell === EPlayer.BLANK) {
                    freeCells++;
                }

                if (cell === EPlayer.X) {
                    xCells++;
                }

                if (cell === EPlayer.O) {
                    oCells++;
                }
            }
        }

        if (freeCells === 0) {
            throw new ValidationError(`No free cells!`, "", null);
        }

        if (oCells !== xCells) {
            throw new ValidationError(`Not valid state: X = ${xCells}, O = ${oCells}`, "", null);
        }
    }

    private static assertBoardValid(expected: number, actual: number): void {
        if (expected !== actual) {
            throw new ValidationError(`Board size is not valid: should be ${expected}, actual: ${actual}`, "", "");
        }
    }
}
