import chess from "../../shared/chess";
import ChessPiece from "../ChessPiece/ChessPiece";

import "./ChessSpace.css"

const ChessSpace = () => {

    return (
        <div className="chess_space_container">
            <div className="chess_space_container">
                {chess.map((c, index) => {
                    return <ChessPiece key={index} pattern={c} color="blue"/>
                })}
            </div>
            <div className="chess_space_container">
                {chess.map((c, index) => {
                    return <ChessPiece key={index} pattern={c} color="yellow"/>
                })}
            </div>
            <div className="chess_space_container">
                {chess.map((c, index) => {
                    return <ChessPiece key={index} pattern={c} color="red"/>
                })}
            </div>
            <div className="chess_space_container">
                {chess.map((c, index) => {
                    return <ChessPiece key={index} pattern={c} color="green"/>
                })}
            </div>
        </div>
    );
}

export default ChessSpace;