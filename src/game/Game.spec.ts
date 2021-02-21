import { Board } from "../board/Board";
import { Game } from "./Game";
import { expect } from "chai";
import { EPlayer } from "../player/EPlayer";
import { readBoardData } from "../util/Util";
import { IBoardData } from "../board/IBoard";

describe("Game", () => {
    let defaultData: IBoardData;

    before(async () => {
        defaultData = await readBoardData("./data.json");
    });

    it("X should win with default data", async () => {
        const board = new Board(3, defaultData);

        const game = new Game(board);

        const result = game.play();

        expect(result.winner).to.eq(EPlayer.X);
        expect(result.cell).to.eql([2, 1]);
    });

    it("X should win on 1x1", async () => {
        const board = new Board(1, await readBoardData("./testData/1x1.json"));

        const game = new Game(board);

        const result = game.play();

        expect(result.winner).to.eq(EPlayer.X);
        expect(result.cell).to.eql([0, 0]);
    });

    it("X should win on 2x2", async () => {
        const board = new Board(2, await readBoardData("./testData/2x2.json"));

        const game = new Game(board);

        const result = game.play();

        expect(result.winner).to.eq(EPlayer.X);
        expect(result.cell).to.eql([0, 1]);
    });

    it("O should win", async () => {
        const board = new Board(3, await readBoardData("./testData/win_o.json"));

        const game = new Game(board);

        const result = game.play();

        expect(result.winner).to.eq(EPlayer.O);
        expect(result.cell).to.eql([2, 2]);
    });

    it("X should win on opposite diagonal", async () => {
        const board = new Board(3, await readBoardData("./testData/win_x_opposite.json"));

        const game = new Game(board);

        const result = game.play();

        expect(result.winner).to.eq(EPlayer.X);
        expect(result.cell).to.eql([0, 2]);
    });

    it("X should win on 4x4 board", async () => {
        const board = new Board(4, await readBoardData("./testData/win_x_4x4.json"));

        const game = new Game(board);

        const result = game.play();

        expect(result.winner).to.eq(EPlayer.X);
        expect(result.cell).to.eql([3, 1]);
    });
});
