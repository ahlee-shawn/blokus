import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import "./HomePage.css";
import { query, collection, getDocs, where } from "firebase/firestore";
import appRoutes from '../../shared/appRoutes';

function HomePage() {
    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [gameId, setGameId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        console.log(gameId)
    };

    useEffect(() => {
        if (!user) {
            return navigate(appRoutes.login);
        }
        setName(user.displayName);
    }, [user]);

    return (
        <div className="homepage">
            <div className="homepage_container">
                <h1>BLOKUS</h1>
                <p>A game where players try to win by
                    <br />occupying most of the board with pieces of their colour</p>
                <h3>Logged in as <span className="homepage_login_name">{name}</span></h3>
                <div className="homepage_gamebox">
                    <button className="homepage_createbtn">Create New Game</button>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Existing Game ID:
                            <input
                                type="text" 
                                pattern="^[0-9]{6}$" 
                                maxLength="6"
                                placeholder="6-digit Game ID..."
                                value={gameId}
                                onChange={e => setGameId(e.target.value)}
                            />
                        </label>
                        <button type="submit">Join</button>
                    </form>
                </div>
                <button className="homepage_btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default HomePage;