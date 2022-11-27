import React, { Component } from "react";

import controlContext from "./contexts/control-context";
import GameSpace from "./containers/GameSpace/GameSpace";
import ChessPanel from "./containers/ChessPanel/ChessPanel";

import board from "./shared/board";
import chess from "./shared/chess";

import "./App.css";

import _ from "lodash";

class App extends Component {
  state = {
    selectedChessId: "",
    selectedChessPattern: [[]],
    currPlayer: "",
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
  }

  constructor() {
    super();
    this.rotateOrFlipChess = this.rotateOrFlipChess.bind(this);
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.rotateOrFlipChess, false);
  }

  rotateOrFlipChess = (event) => {
    if (this.state.selectedChessId !== "") {
      let player = this.state.selectedChessId.substr(this.state.selectedChessId.length - 1) - 1;
      let patternIndex = this.state.selectedChessId.split("_")[3];
      var pattern = _.cloneDeep(this.state.selectedChessPattern);
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
    this.setState({ currPlayer: player.substr(player.length - 1) });
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
    return true
  }

  renderPlaceChess = (mouseRow, mouseCol) => {
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
    this.setState({ gameBoard: gameBoardClone });
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
        this.setState({ currPlayer: "" });
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
