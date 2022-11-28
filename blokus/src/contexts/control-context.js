import { createContext } from "react";

const controlContext = createContext({
    selectChess: () => {},
    selectedChessId: "",
    selectedChessPattern: [[]],
    currPlayer: "",
    previewChess: () => {},
    clearPreviewChess: () => {},
    placeChess: () => {},
    playerChessList: [[]],
    playerChessPatternList: [[]],
    gameBoard: [],
    viewBoard: [],
    playerScore: [],
});

export default controlContext;