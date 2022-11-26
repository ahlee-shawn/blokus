import { useContext } from "react";
import controlContext from "../../contexts/control-context";
import BoardCell from "../BoardCell/BoardCell";
import "./Board.css"

import _ from "lodash";

const Board = () => {
    const {
        clearPreviewChess,
        viewBoard
    } = useContext(controlContext);

    const rowLength = 20;

    return (
        <div className="board" onMouseLeave={(e) => clearPreviewChess(e)}>
            {_.times(rowLength).map((row) => {
                return <div key={"board_row-"+row} className="board_row">{viewBoard[row].map((player, col) => {
                    return <BoardCell key={"row-"+row+"-col-"+col} player={player} row={row} col={col}/>
                })}</div>
            })}
        </div>
    );
}

export default Board;