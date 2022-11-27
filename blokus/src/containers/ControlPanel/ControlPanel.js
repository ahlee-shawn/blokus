import "./ControlPanel.css"

const ControlPanel = () => {

    return (
        <div className="control_panel">
            <button className="control_button"><p className="control_text">Skip Turn</p></button>
            <button className="control_button"><p className="control_text">End Game</p></button>
        </div>
    );
}

export default ControlPanel;