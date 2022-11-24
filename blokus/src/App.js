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

  render() {
    return (
      <React.Fragment>
        <controlContext.Provider
          value={{
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
