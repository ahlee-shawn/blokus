import "./ChessCell.css"

const chessCellSwitch = (props) => {
    const id = "chess_cell_row_" + props.row + "_col_" + props.col;
    switch(props.visible) {
        case "1":
            switch(props.color) {
                case "blue":
                    return <button type="button" className="chess_cell_button blue_cell" id={id}></button>
                case "yellow":
                    return <button type="button" className="chess_cell_button yellow_cell" id={id}></button>
                case "red":
                    return <button type="button" className="chess_cell_button red_cell" id={id}></button>
                case "green":
                    return <button type="button" className="chess_cell_button green_cell" id={id}></button>
                default:
                    return <button type="button" className="chess_cell_button tranparent_cell" id={id}></button>
            }
        default:
            return <button type="button" className="chess_cell_button tranparent_cell" id={id}></button>
    }
}

const ChessCell = (props) => {

    return (
        chessCellSwitch(props)
    );
}

export default ChessCell;