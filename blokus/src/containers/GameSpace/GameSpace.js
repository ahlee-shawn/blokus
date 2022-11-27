import Board from "../Board/Board";
import Scoreboard from "../ScoreBoard/ScoreBoard";
import "./GameSpace.css"

const GameSpace = () => {

    return (
        <div className="game_space_container">
            <Board />
            <Scoreboard />
        </div>
    );
}

export default GameSpace;