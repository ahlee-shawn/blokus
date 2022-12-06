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
                <div id="invalidPlacementMsgBlock">
                    <p id="invalidPlacementMsg">{invalidPlacementMsg}</p>
                </div>
            }
        </div>
    );
}

export default Message;