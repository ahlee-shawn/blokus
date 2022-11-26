import React, { Component } from "react";

import controlContext from "./contexts/control-context";
import ControlPanel from "./containers/GameSpace/GameSpace";
import GameSpace from "./containers/ControlPanel/ControlPanel";

import board from "./shared/board";

import "./App.css";

class App extends Component {
  state = {
    board: board,
  }

  // constructor() {
  //   super();
  // }

  selectChess = (e) => {
    const div_id = e.nativeEvent.path[2].id;
    this.setState({ selectedChessId: div_id});
  }

  render() {
    const {
      selectedChessId
    } = this.state;

    return (
      <React.Fragment>
        <controlContext.Provider
          value={{
            selectChess: this.selectChess,
            selectedChessId,
            board,
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
