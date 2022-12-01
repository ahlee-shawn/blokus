import { useContext } from "react";
import controlContext from "../../contexts/control-context";
import "./ControlPanel.css"

const ControlPanel = () => {
    const {
        skipTurn,
        endGame
    } = useContext(controlContext);

    return (
        <div className="control_panel">
            <button className="control_button" onClick={() => skipTurn()}><p className="control_text">Skip Turn</p></button>
            <button className="control_button" onClick={() => endGame()}><p className="control_text">End Game</p></button>
        </div>
    );
}

export default ControlPanel;