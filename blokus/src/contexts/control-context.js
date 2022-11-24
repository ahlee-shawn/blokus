import { createContext } from "react";
import board from "../shared/board";

const controlContext = createContext({
    board: board,
});

export default controlContext;