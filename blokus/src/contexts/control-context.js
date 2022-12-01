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
    invalidPlacementMsg: "",
    userName: "",
    getPlayerId: () => {},
});

export default controlContext;