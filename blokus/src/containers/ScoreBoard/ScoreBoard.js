import { useContext } from "react";
import controlContext from "../../contexts/control-context";
import "./ScoreBoard.css"

const ScoreBoard = () => {
    const {
        gameBoard,
    } = useContext(controlContext);

    const getScore = (player) => {
        const rowLength = 20;
        var count = 0;
        for (var i = 0; i < rowLength; i++) {
            for (var j = 0; j < rowLength; j++) {
                if (gameBoard[i][j] === player) {
                    count++;
                }
            }
        }
        return count;
    }

    return (
        <div className="score_board">
            <div>Score: </div>
            <div>
                <button type="button" className="board_cell_button player_one_cell" id="board_cell_row_score_player1"></button>
                : {getScore("1")}
            </div>
            <div>
                <button type="button" className="board_cell_button player_two_cell" id="board_cell_row_score_player2"></button>
                : {getScore("2")}
            </div>
            <div>
                <button type="button" className="board_cell_button player_three_cell" id="board_cell_row_score_player3"></button>
                : {getScore("3")}
            </div>
            <div>
                <button type="button" className="board_cell_button player_four_cell" id="board_cell_row_score_player4"></button>
                : {getScore("4")}
            </div>
        </div>
    );
}

export default ScoreBoard;