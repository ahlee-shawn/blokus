import _ from "lodash";
import ChessCell from "../ChessCell/ChessCell";

import "./ChessPiece.css"

const ChessPiece = (props) => {

    const rowLength = 5;

    return (
        <div className="chess_piece">
            {console.log(props.pattern)}
            {_.times(rowLength).map((row) => {
                return <div key={"chess_row-"+row} className="chess_row">{props.pattern[row].map((visible, col) => {
                    return <ChessCell key={"row-"+row+"-col-"+col} visible={visible} color={props.color} row={row} col={col}/>
                })}</div>
            })}
        </div>
    );
}

export default ChessPiece;