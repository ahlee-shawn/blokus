import "./BoardCell.css"

const boardCellSwitch = (props) => {
    const id = "board_cell_row_" + props.row + "_col_" + props.col;
    if (props.player === "0" && props.row === 0 && props.col === 0) { // top left
        return <button type="button" className="board_cell_button player_two_cell" id={id}></button>
    } else if (props.player === "0" && props.row === 0 && props.col === 19) { // top right
        return <button type="button" className="board_cell_button player_three_cell" id={id}></button>
    } else if (props.player === "0" && props.row === 19 && props.col === 0) { // bottom left
        return <button type="button" className="board_cell_button player_one_cell" id={id}></button>
    } else if (props.player === "0" && props.row === 19 && props.col === 19) { // bottom right
        return <button type="button" className="board_cell_button player_four_cell" id={id}></button>
    } else if (props.player === "1") {
        return <button type="button" className="board_cell_button player_one_cell" id={id}></button>
    } else if (props.player === "2") {
        return <button type="button" className="board_cell_button player_two_cell" id={id}></button>
    } else if (props.player === "3") {
        return <button type="button" className="board_cell_button player_three_cell" id={id}></button>
    } else if (props.player === "4") {
        return <button type="button" className="board_cell_button player_four_cell" id={id}></button>
    } else {
        return <button type="button" className="board_cell_button no_player_cell" id={id}></button>
    }
}

const BoardCell = (props) => {

    return (
        boardCellSwitch(props)
    );
}

export default BoardCell;