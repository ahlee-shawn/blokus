import Board from "../Board/Board";
import ChessSpace from "../ChessSpace/ChessSpace";
import Scoreboard from "../ScoreBoard/ScoreBoard";
import "./GameSpace.css"

const GameSpace = () => {

    return (
        <div className="game_space_container">
            <Board />
            <Scoreboard />
            <ChessSpace />
        </div>
    );
}

export default GameSpace;