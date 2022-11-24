import "./BoardCell.css"

const boardCellSwitch = (props) => {
    const id = "board_cell_row_" + props.row + "_col_" + props.col;
    switch(props.player) {
        case "1":
            return <button type="button" className="board_cell_button player_one_cell" id={id}></button>
        case "2":
            return <button type="button" className="board_cell_button player_two_cell" id={id}></button>
        case "3":
            return <button type="button" className="board_cell_button player_three_cell" id={id}></button>
        case "4":
            return <button type="button" className="board_cell_button player_four_cell" id={id}></button>
        default:
            return <button type="button" className="board_cell_button no_player_cell" id={id}></button>
    }
}

const BoardCell = (props) => {

    return (
        boardCellSwitch(props)
    );
}

export default BoardCell;