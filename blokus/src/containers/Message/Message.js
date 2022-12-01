import { useContext } from "react";
import controlContext from "../../contexts/control-context";

import "./Message.css"

const Message = () => {
    const {
        invalidPlacementMsg,
        userName,
    } = useContext(controlContext);

    return (
        <div className="message">
            <p id="curPlayerMsg">Current player: {userName}</p>
            {invalidPlacementMsg !== "" &&
                <p id="invalidPlacementMsg">{invalidPlacementMsg}</p>
            }
        </div>
    );
}

export default Message;