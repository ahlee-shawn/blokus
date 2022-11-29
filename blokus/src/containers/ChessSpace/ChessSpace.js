import { useContext } from "react";
import controlContext from "../../contexts/control-context";
import ChessPiece from "../ChessPiece/ChessPiece";

import _ from "lodash";

import "./ChessSpace.css"

const ChessSpace = () => {

    const chess_piece_count = 21;

    const {
        playerChessList
    } = useContext(controlContext);

    return (
        <div className="chess_space_container">
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return playerChessList[0][index] ? <ChessPiece key={index} pattern={index} color="blue" player="1"/> : <div key={index} className="empty_div"></div>
                })}
            </div>
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return playerChessList[1][index] ? <ChessPiece key={index} pattern={index} color="yellow" player="2"/> : <div key={index} className="empty_div"></div>
                })}
            </div>
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return playerChessList[2][index] ? <ChessPiece key={index} pattern={index} color="red" player="3"/> : <div key={index} className="empty_div"></div>
                })}
            </div>
            <div className="chess_space_container">
                {_.times(chess_piece_count).map((index) => {
                    return playerChessList[3][index] ? <ChessPiece key={index} pattern={index} color="green" player="4"/> : <div key={index} className="empty_div"></div>
                })}
            </div>
        </div>
    );
}

export default ChessSpace;