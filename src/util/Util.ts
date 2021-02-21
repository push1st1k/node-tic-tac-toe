import util from "util";
import fs from "fs";
import { IBoardData } from "../board/IBoard";

const readFileAsync = util.promisify(fs.readFile);

export const readBoardData = async (path: string): Promise<IBoardData> => JSON.parse((await readFileAsync(path)).toString());
