import "./ChessCell.css"

const ChessCell = (props) => {

    const id = "chess_cell_row_" + props.row + "_col_" + props.col;
    var className = "chess_cell_button";

    if (props.visible === "1") {
        if (props.color === "blue") {
            className += " blue_cell";
        } else if (props.color === "yellow") {
            className += " yellow_cell";
        } else if (props.color === "red") {
            className += " red_cell";
        } else if (props.color === "green") {
            className += " green_cell";
        }
        // highlight borders
        if (props.highlightBorder[props.row][props.col][0]) {
            className += " highlight_border_top";
        }
        if (props.highlightBorder[props.row][props.col][1]) {
            className += " highlight_border_right";
        }
        if (props.highlightBorder[props.row][props.col][2]) {
            className += " highlight_border_bottom";
        }
        if (props.highlightBorder[props.row][props.col][3]) {
            className += " highlight_border_left";
        }
    } else {
        className += " tranparent_cell";
    }

    return <button type="button" className={className} id={id}></button>
}

export default ChessCell;