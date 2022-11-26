import { createContext } from "react";
import board from "../shared/board";

const controlContext = createContext({
    selectChess: () => {},
    selectedChessId: "",
    board: board,
});

export default controlContext;