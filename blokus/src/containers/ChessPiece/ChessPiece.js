import { useContext } from "react";
import controlContext from "../../contexts/control-context";
import ChessCell from "../ChessCell/ChessCell";

import _ from "lodash";

import "./ChessPiece.css"

const ChessPiece = (props) => {

    const {
        selectChess,
        selectedChessId,
        playerChessPatternList,
        currPlayer,
        getPlayerId,
    } = useContext(controlContext);

    const rowLength = 5;
    const id = "chess_piece_pattern_" + props.pattern + "_" + props.player;
    const pattern = playerChessPatternList[parseInt(props.player.substr(props.player.length - 1)) - 1][props.pattern];

    var highlightBorderRow = [ // [top, right, bottom, left]
        _.times(4, _.constant(false)),
        _.times(4, _.constant(false)),
        _.times(4, _.constant(false)),
        _.times(4, _.constant(false)),
        _.times(4, _.constant(false))
    ];

    var highlightBorder = [
        _.cloneDeep(highlightBorderRow),
        _.cloneDeep(highlightBorderRow),
        _.cloneDeep(highlightBorderRow),
        _.cloneDeep(highlightBorderRow),
        _.cloneDeep(highlightBorderRow)
    ];

    if (selectedChessId === id) { // highlight chess border
        for (var i = 0; i < rowLength; i++) {
            for (var j = 0; j < rowLength; j++) {
                if (pattern[i][j] === "1") {
                    // top
                    if (i === 0 || pattern[i-1][j] === "0") {
                        highlightBorder[i][j][0] = true;
                    }
                    // right
                    if (j === rowLength - 1 || pattern[i][j+1] === "0") {
                        highlightBorder[i][j][1] = true;
                    }
                    // bottom
                    if (i === rowLength - 1 || pattern[i+1][j] === "0") {
                        highlightBorder[i][j][2] = true;
                    }
                    // left
                    if (j === 0 || pattern[i][j-1] === "0") {
                        highlightBorder[i][j][3] = true;
                    }
                }
            }
        }
    }

    return (
        // <div className={ `${"chess_piece_" + props.color} ${selectedChessId === id ? "selected_" + props.color : ""}` } id={id} onClick={(e) => selectChess(e)}>
        <div className={`"chess_piece_" + ${props.color} ${currPlayer === props.player && currPlayer === getPlayerId() ? "" : "disabled_chess_piece"}`} id={id} onClick={currPlayer === props.player ? (e) => selectChess(e) : undefined}>
            {_.times(rowLength).map((row) => {
                return (
                    <div key={"chess_row-"+row} className="chess_row">{pattern[row].map((visible, col) => {
                        return <ChessCell key={"row-"+row+"-col-"+col} visible={visible} color={props.color} row={row} col={col} highlightBorder={highlightBorder}/>
                    })}
                    </div>
                )
            })}
        </div>
    );
}

export default ChessPiece;