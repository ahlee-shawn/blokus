import _ from "lodash";
import ChessPiece from "../ChessPiece/ChessPiece";

import "./ChessSpace.css"

const ChessSpace = () => {

    const chess_piece_count = 21;

    return (
        <div className="chess_space_container">
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return <ChessPiece key={index} pattern={index} color="blue" player="player1"/>
                })}
            </div>
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return <ChessPiece key={index} pattern={index} color="yellow" player="player2"/>
                })}
            </div>
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return <ChessPiece key={index} pattern={index} color="red" player="player3"/>
                })}
            </div>
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return <ChessPiece key={index} pattern={index} color="green" player="player4"/>
                })}
            </div>
        </div>
    );
}

export default ChessSpace;