import { useContext } from "react";
import controlContext from "../../contexts/control-context";

import "./Message.css"

const Message = () => {
    const {
        invalidPlacementMsg,
    } = useContext(controlContext);

    return (
        <div className="message">
            {invalidPlacementMsg !== "" &&
                <p id="invalidPlacementMsg">{invalidPlacementMsg}</p>
            }
        </div>
    );
}

export default Message;