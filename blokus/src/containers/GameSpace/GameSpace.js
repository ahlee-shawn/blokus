import Board from "../Board/Board";
import Scoreboard from "../ScoreBoard/ScoreBoard";
import ControlPanel from "../ControlPanel/ControlPanel";
import Rules from "../Rules/Rules";
import "./GameSpace.css"

const GameSpace = () => {

    return (
        <div className="game_space_container">
            <h1>Blokus</h1>
            <Board />
            <Scoreboard />
            <ControlPanel />
            <Rules />
        </div>
    );
}

export default GameSpace;