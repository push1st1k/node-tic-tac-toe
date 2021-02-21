import { Board } from "./board/board";
import logger from "./logger/ConsoleLogger";
import { Game } from "./game/game";
import { ValidationError } from "joi";
import { readBoardData } from "./util/Util";
import path from "path";

const defaultDataPath = "./data.json";

const run = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const cli = require("readline-promise").default.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true,
        });

        const boardSize = parseInt(await cli.questionAsync(`Please define board size (default is ${Board.DEFAULT_BOARD_SIZE}): `), 10) || undefined;

        const pathToData: string = (await cli.questionAsync(`Please define path to the board data (default is ${defaultDataPath}): `)) || defaultDataPath;

        let data;

        try {
            data = await readBoardData(path.join(pathToData));
        } catch (e) {
            throw new ValidationError(`Board data cannot be extracted: ${e.message}`, "", e);
        }

        const board: Board = new Board(boardSize, data);

        new Game(board).play();

        process.exit(0);
    } catch (e) {
        logger.error("Something went wrong", e);
        process.exit(-1);
    }
};

run();
