import Board from "../Board/Board";
import Scoreboard from "../ScoreBoard/ScoreBoard";
import Message from "../Message/Message";
import ControlPanel from "../ControlPanel/ControlPanel";
import Rules from "../Rules/Rules";

import "./GameSpace.css"

const GameSpace = () => {

    return (
        <div className="game_space_container">
            <h1>Blokus</h1>
            <Board />
            <Scoreboard />
            <Message />
            <ControlPanel />
            <Rules />
        </div>
    );
}

export default GameSpace;