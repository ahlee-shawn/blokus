import "./Rules.css"

const Rules = () => {

    return (
        <div>
            <h2 className="rules_title">Rules</h2>
            <p>Press the space bar to rotate the selected piece by 90 degrees clockwise.</p>
            <p>Press the arrow left or right keys to flip the selected piece horizontally.</p>
            <p>Press the arrow up or bottom keys to flip the selected piece vertically.</p>
        </div>
    );
}

export default Rules;