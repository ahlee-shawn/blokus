import { useContext } from "react";
import controlContext from "../../contexts/control-context";

import "./Message.css"

const Message = () => {
    const {
        invalidPlacementMsg,
        currPlayerName,
    } = useContext(controlContext);

    return (
        <div className="message">
            <p id="curPlayerMsg">Current player: {currPlayerName}</p>
            {invalidPlacementMsg !== "" &&
                <p id="invalidPlacementMsg">{invalidPlacementMsg}</p>
            }
        </div>
    );
}

export default Message;