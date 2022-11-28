import { useContext } from "react";
import controlContext from "../../contexts/control-context";

import "./ScoreBoard.css"

const ScoreBoard = () => {
    const {
        playerScore,
    } = useContext(controlContext);

    return (
        <div className="score_board">
            <div>Score: </div>
            <div>
                <button type="button" className="score_cell_button player_one_cell" id="board_cell_row_score_player1"></button>
                : {playerScore[0]}
            </div>
            <div>
                <button type="button" className="score_cell_button player_two_cell" id="board_cell_row_score_player2"></button>
                : {playerScore[1]}
            </div>
            <div>
                <button type="button" className="score_cell_button player_three_cell" id="board_cell_row_score_player3"></button>
                : {playerScore[2]}
            </div>
            <div>
                <button type="button" className="score_cell_button player_four_cell" id="board_cell_row_score_player4"></button>
                : {playerScore[3]}
            </div>
        </div>
    );
}

export default ScoreBoard;