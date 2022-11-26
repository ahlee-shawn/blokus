import React, { Component } from "react";

import controlContext from "./contexts/control-context";
import ControlPanel from "./containers/GameSpace/GameSpace";
import GameSpace from "./containers/ControlPanel/ControlPanel";

import board from "./shared/board";
import chess from "./shared/chess";

import "./App.css";

import _ from "lodash";

class App extends Component {
  state = {
    selectedChessId: "",
    selectedChessPattern: [],
    currPlayer: "",
    gameBoard: _.cloneDeep(board),
    viewBoard: _.cloneDeep(board),
  }

  // constructor() {
  //   super();
  // }

  selectChess = (e) => {
    const divId = e.nativeEvent.path[2].id;
    this.setState({ selectedChessId: divId });
    this.setState({ selectedChessPattern: chess[divId.split("_")[3]] });
    let player = divId.split("_")[4];
    this.setState({ currPlayer: player.substr(player.length - 1) });
  }

  canPreviewChess = (mouseRow, mouseCol) => {
    const pattern = this.state.selectedChessPattern;
    const patternLength = 5;
    const offset = 2;
    for (var i = 0; i < patternLength; i++) {
      for (var j = 0; j <= patternLength; j++) {
        if (pattern[i][j] === "1") {
          if (mouseRow - offset + i < 0 || mouseRow - offset + i > 19) {
            return false;
          }
          if (mouseCol - offset + j < 0 || mouseCol - offset + j > 19) {
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

  previewChess = (e) => {
    if (this.state.selectedChessId !== "") {
      const mouseRow = e.target.id.split("_")[3];
      const mouseCol = e.target.id.split("_")[5];
      if (this.canPreviewChess(mouseRow, mouseCol)) {
        this.renderPreviewChess(mouseRow, mouseCol);
      }
    }
  }

  clearPreviewChess = (e) => {
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

  placeChess = (e) => {
    if (this.state.selectedChessId !== "") {
      const mouseRow = e.target.id.split("_")[3];
      const mouseCol = e.target.id.split("_")[5];
      if (this.canPlaceChess(mouseRow, mouseCol)) {
        this.renderPlaceChess(mouseRow, mouseCol);
        this.setState({ selectedChessId: "" });
        this.setState({ selectedChessPattern: [] });
        this.setState({ currPlayer: "" });
      }
    }
  }

  render() {
    const {
      selectedChessId,
      selectedChessPattern,
      currPlayer,
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
            gameBoard,
            viewBoard,
          }}
        >
          <div className="gui_container">
            <div className="game_container">
              <ControlPanel />
              <GameSpace />
            </div>
          </div>
        </controlContext.Provider>
      </React.Fragment>
    )
  }

}

export default App;
