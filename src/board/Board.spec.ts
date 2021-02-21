import { Board } from "./Board";
import { expect } from "chai";
import { ValidationError } from "joi";
import { EPlayer } from "../player/EPlayer";
import { readBoardData } from "../util/Util";
import { IBoardData } from "./IBoard";

describe("Board", () => {
    let defaultData: IBoardData;

    before(async () => {
        defaultData = await readBoardData("./data.json");
    });

    it("should throw an error if board size is invalid", async () => {
        try {
            await new Board("test" as any, defaultData);
            expect.fail();
        } catch (e) {
            expect(e).to.be.instanceOf(ValidationError);
        }
    });

    it("should throw an error if board data rows does not meet size", async () => {
        try {
            new Board(4, await readBoardData("./testData/invalid_rows.json"));
            expect.fail();
        } catch (e) {
            expect(e).to.be.instanceOf(ValidationError);
            expect(e.message).to.contain("Board size is not valid");
        }
    });

    it("should throw an error if board data columns does not meet size", async () => {
        try {
            new Board(3, await readBoardData("./testData/invalid_columns.json"));
            expect.fail();
        } catch (e) {
            expect(e).to.be.instanceOf(ValidationError);
            expect(e.message).to.contain("Board size is not valid");
        }
    });

    it("should throw an error if board data contains invalid data", async () => {
        try {
            new Board(3, await readBoardData("./testData/invalid_data.json"));
            expect.fail();
        } catch (e) {
            expect(e).to.be.instanceOf(ValidationError);
            expect(e.message).to.contain("Unknown cell value");
        }
    });

    it("should throw an error if there is no free cells", async () => {
        try {
            new Board(3, await readBoardData("./testData/invalid_no_free.json"));
            expect.fail();
        } catch (e) {
            expect(e).to.be.instanceOf(ValidationError);
            expect(e.message).to.contain("No free cells!");
        }
    });

    it("should throw an error if the data is invalid (not valid moves)", async () => {
        try {
            new Board(3, await readBoardData("./testData/invalid_no_valid_moves.json"));
            expect.fail();
        } catch (e) {
            expect(e).to.be.instanceOf(ValidationError);
            expect(e.message).to.contain("Not valid state");
        }
    });

    it("should return board size", async () => {
        expect(new Board(3, defaultData).size).to.eq(3);
    });

    it("should return valid board data", async () => {
        const board = new Board(3, defaultData);

        expect(board.data).to.eql([
            [EPlayer.X, EPlayer.X, EPlayer.O],
            [EPlayer.O, EPlayer.X, EPlayer.O],
            [EPlayer.BLANK, EPlayer.BLANK, EPlayer.BLANK],
        ]);
    });
});
