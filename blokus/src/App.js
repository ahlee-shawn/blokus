import React, { Component } from "react";

import controlContext from "./contexts/control-context";
import GameSpace from "./containers/GameSpace/GameSpace";
import ChessPanel from "./containers/ChessPanel/ChessPanel";

import board from "./shared/board";
import chess from "./shared/chess";

import _ from "lodash";

import "./App.css";

class App extends Component {
  state = {
    selectedChessId: "",
    selectedChessPattern: [[]],
    currPlayer: "1",
    playerChessList: [
      _.times(21, _.constant(true)),
      _.times(21, _.constant(true)),
      _.times(21, _.constant(true)),
      _.times(21, _.constant(true)),
    ],
    playerChessPatternList: [
      _.cloneDeep(chess),
      _.cloneDeep(chess),
      _.cloneDeep(chess),
      _.cloneDeep(chess),
    ],
    gameBoard: _.cloneDeep(board),
    viewBoard: _.cloneDeep(board),
    mouseLocation: {},
    playerScore: [0, 0, 0, 0],
    invalidPlacementMsg: "",
  }

  constructor() {
    super();
    this.rotateOrFlipChess = this.rotateOrFlipChess.bind(this);
    this.mouseMoveOnBoard = this.mouseMoveOnBoard.bind(this);
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.rotateOrFlipChess, false);
    document.addEventListener("mousemove", this.mouseMoveOnBoard, false);
  }

  mouseMoveOnBoard = (event) => {
    this.setState({ mouseLocation: document.elementFromPoint(event.clientX, event.clientY) });
  }

  rotateOrFlipChess = (event) => {
    if (this.state.selectedChessId !== "" && [32, 37, 38, 39, 40].includes(event.keyCode)) {
      let player = this.state.currPlayer - 1;
      let patternIndex = this.state.selectedChessId.split("_")[3];
      var pattern = this.state.selectedChessPattern;
      if (event.keyCode === 32) { // space pressed
        pattern = this.rotateChess(pattern);
      } else if (event.keyCode === 37 || event.keyCode === 39) { // arrow left or right pressed
        pattern = this.horizontalFlipChess(pattern);
      } else if (event.keyCode === 38 || event.keyCode === 40) { // arrow up or down pressed
        pattern = this.verticalFlipChess(pattern);
      }
      this.setState({ selectedChessPattern: pattern });
      var playerChessPatternListClone = _.cloneDeep(this.state.playerChessPatternList);
      playerChessPatternListClone[player][patternIndex] = pattern;
      this.setState({ playerChessPatternList: playerChessPatternListClone });

      // modify the board preview as well
      if (this.state.mouseLocation.classList.contains("board_cell_button")) {
        let forgedEvent = {
          target: { id: this.state.mouseLocation.id }
        };
        this.previewChess(forgedEvent);
      }
    }
    event.preventDefault();
    event.stopPropagation();
  }

  rotateChess = (pattern) => { // rotate the pattern by 90 degrees clockwise
    pattern = this.tranposeChess(pattern);
    pattern = this.horizontalFlipChess(pattern);
    return pattern;
  }

  tranposeChess = (pattern) => { // rotate the pattern by 90 degrees clockwise
    for (var i = 0; i < 5; i++) {
      for (var j = i + 1; j < 5; j++) {
        const temp = pattern[i][j];
        pattern[i][j] = pattern[j][i];
        pattern[j][i] = temp;
      }
    }
    return pattern;
  }

  horizontalFlipChess = (pattern) => {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 2; j++) {
        const temp = pattern[i][j];
        pattern[i][j] = pattern[i][4 - j];
        pattern[i][4 - j] = temp;
      }
    }
    return pattern;
  }

  verticalFlipChess = (pattern) => {
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 5; j++) {
        const temp = pattern[i][j];
        pattern[i][j] = pattern[4 - i][j];
        pattern[4 - i][j] = temp;
      }
    }
    return pattern;
  }

  selectChess = (event) => {
    const divId = event.nativeEvent.path[2].id;
    this.setState({ selectedChessId: divId });
    let player = divId.split("_")[4];
    this.setState({ selectedChessPattern: this.state.playerChessPatternList[parseInt(player.substr(player.length - 1)) - 1][parseInt(divId.split("_")[3])] });
  }

  canPreviewChess = (mouseRow, mouseCol) => {
    const pattern = this.state.selectedChessPattern;
    const patternLength = 5;
    const offset = 2;
    for (var i = 0; i < patternLength; i++) {
      for (var j = 0; j <= patternLength; j++) {
        if (pattern[i][j] === "1") {
          if (mouseRow - offset + i < 0 || mouseRow - offset + i > 19) {
            this.clearPreviewChess();
            return false;
          }
          if (mouseCol - offset + j < 0 || mouseCol - offset + j > 19) {
            this.clearPreviewChess();
            return false;
          }
        }
      }
    }
    return true;
  }

  renderPreviewChess = (mouseRow, mouseCol) => {
    const pattern = this.state.selectedChessPattern;
    const patternLength = 5;
    const offset = 2;
    var gameBoardClone = _.cloneDeep(this.state.gameBoard);
    const player = this.state.currPlayer;
    for (var i = 0; i < patternLength; i++) {
      for (var j = 0; j <= patternLength; j++) {
        if (pattern[i][j] === "1") {
          gameBoardClone[mouseRow - offset + i][mouseCol - offset + j] = player;
        }
      }
    }
    this.setState({ viewBoard: gameBoardClone });
  }

  previewChess = (event) => {
    if (this.state.selectedChessId !== "") {
      const mouseRow = event.target.id.split("_")[3];
      const mouseCol = event.target.id.split("_")[5];
      if (this.canPreviewChess(mouseRow, mouseCol)) {
        this.renderPreviewChess(mouseRow, mouseCol);
      }
    }
  }

  clearPreviewChess = () => {
    if (this.state.selectedChessId !== "") {
      let gameBoardClone = _.cloneDeep(this.state.gameBoard);
      this.setState({ viewBoard: gameBoardClone });
    }
  }

  canPlaceChess = (mouseRow, mouseCol) => {
    if (!this.canPreviewChess(mouseRow, mouseCol)) {
      return false
    }

    // TODO: check if the chess can be placed here
    const pattern = this.state.selectedChessPattern;
    const patternLength = 5;
    const offset = 2;
    const gameBoard = this.state.gameBoard;
    const player = this.state.currPlayer;
    const playerScore = this.state.playerScore;

    var touchesSelfBlock = false;
    var coversCorner = false;
    var touchesCorner = false;

    // console.log(gameBoard);
    for (var i = 0; i < patternLength; i++) {
      for (var j = 0; j <= patternLength; j++) {
        if (pattern[i][j] === "1") {
          // check if the space is already taken
          if (gameBoard[mouseRow - offset + i][mouseCol - offset + j] !== '0') {
            this.setState({ invalidPlacementMsg: "Cannot overlap with other blocks" });
            return false;
          }

          // check if touches a block that belongs to the same player
          // top
          if (mouseRow - offset + i - 1 >= 0 && gameBoard[mouseRow - offset + i - 1][mouseCol - offset + j] === player) {
            touchesSelfBlock = true;
          }

          // left
          if (mouseCol - offset + j - 1 >= 0 && gameBoard[mouseRow - offset + i][mouseCol - offset + j - 1] === player) {
            touchesSelfBlock = true;
          }

          // bottom
          if (mouseRow - offset + i + 1 <= 19 && gameBoard[mouseRow - offset + i + 1][mouseCol - offset + j] === player) {
            touchesSelfBlock = true;
          }

          // right
          if (mouseCol - offset + j + 1 <= 19 && gameBoard[mouseRow - offset + i][mouseCol - offset + j + 1] === player) {
            touchesSelfBlock = true;
          }

          if (touchesSelfBlock) {
            this.setState({ invalidPlacementMsg: "Cannot touch same color blocks with edge" });
            return false;
          }

          // check if is connected to corner or existing block
          if (playerScore[parseInt(player) - 1] === 0) { // is placing first block
            // check if covers the corner
            // player 1: bottom left
            if (player === "1" && mouseRow - offset + i === 19 && mouseCol - offset + j === 0) {
              coversCorner = true;
            }

            // player 2: top left
            if (player === "2" && mouseRow - offset + i === 0 && mouseCol - offset + j === 0) {
              coversCorner = true;
            }

            // player 3: top right
            if (player === "3" && mouseRow - offset + i === 0 && mouseCol - offset + j === 19) {
              coversCorner = true;
            }
            
            // player 4: bottom right
            if (player === "4" && mouseRow - offset + i === 19 && mouseCol - offset + j === 19) {
              coversCorner = true;
            }
          } else {
            // check if touches the corner of an existing piece
            if (mouseRow - offset + i - 1 >= 0 && mouseCol - offset + j - 1 >= 0 && gameBoard[mouseRow - offset + i - 1][mouseCol - offset + j - 1] === player) { // top-left
              touchesCorner = true;
            } else if (mouseRow - offset + i + 1 <= 19 && mouseCol - offset + j - 1 >= 0 && gameBoard[mouseRow - offset + i + 1][mouseCol - offset + j - 1] === player) { // bottom-left
              touchesCorner = true;
            } else if (mouseRow - offset + i - 1 >= 0 && mouseCol - offset + j + 1 <= 19 && gameBoard[mouseRow - offset + i - 1][mouseCol - offset + j + 1] === player) { // top-right
              touchesCorner = true;
            } else if (mouseRow - offset + i + 1 <= 19 && mouseCol - offset + j + 1 <= 19 && gameBoard[mouseRow - offset + i + 1][mouseCol - offset + j + 1] === player) { // bottom-right
              touchesCorner = true;
            }
          }
        }
      }
    }

    if (!coversCorner && !touchesCorner) {
      this.setState({ invalidPlacementMsg: "Must start at the corner and consecutive blocks must touch existing same color block with only corner-to-corner contact allowed" });
    }

    return (coversCorner || touchesCorner);
  }

  renderPlaceChess = (mouseRow, mouseCol) => {
    const pattern = this.state.selectedChessPattern;
    const patternLength = 5;
    const offset = 2;
    var gameBoardClone = _.cloneDeep(this.state.gameBoard);
    const player = this.state.currPlayer;
    var numOfSquares = 0;
    for (var i = 0; i < patternLength; i++) {
      for (var j = 0; j <= patternLength; j++) {
        if (pattern[i][j] === "1") {
          gameBoardClone[mouseRow - offset + i][mouseCol - offset + j] = player;
          numOfSquares++;
        }
      }
    }
    this.setState({ gameBoard: gameBoardClone });

    // update score
    var playerScore = { ...this.state.playerScore };
    playerScore[parseInt(player) - 1] += numOfSquares;
    this.setState({ playerScore: playerScore });
  }

  placeChess = (event) => {
    if (this.state.selectedChessId !== "") {
      const mouseRow = event.target.id.split("_")[3];
      const mouseCol = event.target.id.split("_")[5];
      if (this.canPlaceChess(mouseRow, mouseCol)) {
        this.renderPlaceChess(mouseRow, mouseCol);
        let playerChessListClone = this.state.playerChessList;
        playerChessListClone[this.state.currPlayer - 1][this.state.selectedChessId.split("_")[3]] = false;
        this.setState({ playerChessList: playerChessListClone });
        this.setState({ selectedChessId: "" });
        this.setState({ selectedChessPattern: [[]] });
        this.setState({ invalidPlacementMsg: "" });

        // rotate player
        this.setState({ currPlayer: ((this.state.currPlayer) % 4 + 1).toString()});
      }
    }
  }

  render() {
    const {
      selectedChessId,
      selectedChessPattern,
      currPlayer,
      playerChessList,
      playerChessPatternList,
      gameBoard,
      viewBoard,
      playerScore,
      invalidPlacementMsg,
    } = this.state;

    return (
      <React.Fragment>
        <controlContext.Provider
          value={{
            selectChess: this.selectChess,
            selectedChessId,
            selectedChessPattern,
            currPlayer,
            previewChess: this.previewChess,
            clearPreviewChess: this.clearPreviewChess,
            placeChess: this.placeChess,
            playerChessList,
            playerChessPatternList,
            gameBoard,
            viewBoard,
            playerScore,
            invalidPlacementMsg,
          }}
        >
          <div className="gui_container">
            <div className="game_container">
              <GameSpace />
              <ChessPanel />
            </div>
          </div>
        </controlContext.Provider>
      </React.Fragment>
    )
  }

}

export default App;
