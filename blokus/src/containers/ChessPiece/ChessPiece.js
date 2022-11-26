import { useContext } from "react";
import controlContext from "../../contexts/control-context";
import ChessCell from "../ChessCell/ChessCell";
import chess from "../../shared/chess";

import _ from "lodash";

import "./ChessPiece.css"

const ChessPiece = (props) => {

    const {
        selectChess,
        selectedChessId
    } = useContext(controlContext);

    const rowLength = 5;
    const id = "chess_piece_pattern_" + props.pattern + "_" + props.player;
    const pattern = chess[props.pattern]

    return (
        <div className={ `${"chess_piece_" + props.color} ${selectedChessId === id ? "selected_" + props.color : ""}` } id={id} onClick={(e) => selectChess(e)}>
            {_.times(rowLength).map((row) => {
                return (
                    <div key={"chess_row-"+row} className="chess_row">{pattern[row].map((visible, col) => {
                        return <ChessCell key={"row-"+row+"-col-"+col} visible={visible} color={props.color} row={row} col={col}/>
                    })}
                    </div>
                )
            })}
        </div>
    );
}

export default ChessPiece;