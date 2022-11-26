import { createContext } from "react";

const controlContext = createContext({
    selectChess: () => {},
    selectedChessId: "",
    selectedChessPattern: [],
    currPlayer: "",
    previewChess: () => {},
    clearPreviewChess: () => {},
    placeChess: () => {},
    gameBoard: [],
    viewBoard: [],
});

export default controlContext;