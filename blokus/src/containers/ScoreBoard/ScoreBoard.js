import { useContext } from "react";
import controlContext from "../../contexts/control-context";
import "./ScoreBoard.css"

import BoardCell from "../BoardCell/BoardCell";

const ScoreBoard = () => {
    const {
        board
    } = useContext(controlContext);

    const getScore = (player) => {
        const rowLength = 20;
        var count = 0;
        for (var i = 0; i < rowLength; i++) {
            for (var j = 0; j < rowLength; j++) {
                if (board[i][j] === player) {
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
                <BoardCell player="1" row="score" col="player1"/>
                : {getScore("1")}
            </div>
            <div>
                <BoardCell player="2" row="score" col="player2"/>
                : {getScore("2")}
            </div>
            <div>
                <BoardCell player="3" row="score" col="player3"/>
                : {getScore("3")}
            </div>
            <div>
                <BoardCell player="4" row="score" col="player4"/>
                : {getScore("4")}
            </div>
        </div>
    );
}

export default ScoreBoard;