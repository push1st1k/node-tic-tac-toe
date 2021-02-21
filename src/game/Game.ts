import logger from "../logger/ConsoleLogger";
import { Board } from "../board/Board";
import { EPlayer } from "../player/EPlayer";
import { GameResult } from "./GameResult";
import { IBoardData } from "../board/IBoard";

export class Game {
    constructor(private board: Board) {}

    public play(): GameResult {
        const data = this.board.data;

        const result: GameResult = this.checkWin(data);

        const [row, column] = result.cell;

        const position = row * this.board.size + column;

        logger.log(`"${result.winner}" (${position}) won!`);

        return result;
    }

    private parseMoves(data: IBoardData): IMoves {
        const moves: IMoves = {
            [EPlayer.X]: [],
            [EPlayer.O]: [],
            [EPlayer.BLANK]: [],
        };

        for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
            for (let columnIdx = 0; columnIdx < data[rowIdx].length; columnIdx++) {
                const player: EPlayer = data[rowIdx][columnIdx];
                moves[player].push([rowIdx, columnIdx]);
            }
        }

        return moves;
    }

    private checkWin(data: IBoardData): GameResult {
        const boardSize = this.board.size;

        const allMoves: IMoves = this.parseMoves(data);

        const { blank: availableMoves } = allMoves;

        let oGameResult;

        for (const cell of availableMoves) {
            const [row, column] = cell;

            // check diagonal
            if (row === column) {
                const cellsToCheck: EPlayer[] = [];

                for (let i = 0; i < boardSize; i++) {
                    cellsToCheck.push(data[i][i] as EPlayer);
                }

                const results = this.checkRow(cellsToCheck);

                if (results[EPlayer.X]) {
                    return new GameResult(EPlayer.X, cell);
                }

                if (results[EPlayer.O]) {
                    oGameResult = new GameResult(EPlayer.O, cell);
                }
            }

            // check opposite diagonal
            if (row === boardSize - 1 - column) {
                const cellsToCheck: EPlayer[] = [];

                for (let i = 0; i < boardSize; i++) {
                    cellsToCheck.push(data[i][boardSize - 1 - i] as EPlayer);
                }

                const results = this.checkRow(cellsToCheck);

                if (results[EPlayer.X]) {
                    return new GameResult(EPlayer.X, cell);
                }

                if (results[EPlayer.O]) {
                    oGameResult = new GameResult(EPlayer.O, cell);
                }
            }

            // check column
            let cellsToCheck: EPlayer[] = [];

            for (let idx = 0; idx < boardSize; idx++) {
                cellsToCheck.push(data[idx][column] as EPlayer);
            }

            let results = this.checkRow(cellsToCheck);

            if (results[EPlayer.X]) {
                return new GameResult(EPlayer.X, cell);
            }

            if (results[EPlayer.O]) {
                oGameResult = new GameResult(EPlayer.O, cell);
            }

            // check row
            cellsToCheck = [];

            for (let idx = 0; idx < boardSize; idx++) {
                cellsToCheck.push(data[row][idx] as EPlayer);
            }

            results = this.checkRow(cellsToCheck);

            if (results[EPlayer.X]) {
                return new GameResult(EPlayer.X, cell);
            }

            if (results[EPlayer.O]) {
                oGameResult = new GameResult(EPlayer.O, cell);
            }
        }

        if (oGameResult) {
            return oGameResult;
        }

        throw new Error("Nobody can win!");
    }

    private checkRow(
        cells: EPlayer[]
    ): {
        [K in EPlayer]: boolean;
    } {
        const xCanWin = this.canWin(cells, EPlayer.X);

        const oCanWin = this.canWin(cells, EPlayer.O);

        return {
            [EPlayer.X]: xCanWin,
            [EPlayer.O]: oCanWin,
            [EPlayer.BLANK]: false,
        };
    }

    private canWin(cells: EPlayer[], player: EPlayer): boolean {
        let maxFreeCells = 1;

        for (let i = 0; i < cells.length; i++) {
            if (maxFreeCells && cells[i] === EPlayer.BLANK) {
                maxFreeCells--;
                continue;
            }

            if (cells[i] !== player) {
                return false;
            }
        }

        return true;
    }
}

type IMoves = {
    [K in EPlayer]: number[][];
};
