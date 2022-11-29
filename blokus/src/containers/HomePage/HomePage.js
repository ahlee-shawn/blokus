import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import "./HomePage.css";
import { doc, setDoc, getDoc, arrayUnion, updateDoc} from "firebase/firestore";
import appRoutes from '../../shared/appRoutes';

function HomePage() {
    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const gameIdRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        var gid = gameIdRef.current.value;
        const docRef = doc(db, "games", gid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(doc(db, "games", gid), {
                players: arrayUnion(user.uid)
            });
            navigate("/waiting/" + gid);
        } else {
            console.log("No such document!");
        }
    };

    const createGame = async () => {
        var gid = Math.floor(100000 + Math.random() * 900000).toString();
        await setDoc(doc(db, "games", gid), {
            players: [user.uid]
        });
        navigate("/waiting/" + gid);
    };

    useEffect(() => {
        if (!user) {
            return navigate(appRoutes.login);
        }
        else {
            setName(user.displayName);
        }
    }, [user]);

    return (
        <div className="homepage">
            <div className="homepage_container">
                <h1>BLOKUS</h1>
                <p>A game where players try to win by
                    <br />occupying most of the board with pieces of their colour</p>
                <h3>Logged in as <span className="homepage_login_name">{name}</span></h3>
                <div className="homepage_gamebox">
                    <button className="homepage_createbtn" onClick={createGame}>Create New Game</button>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Existing Game ID:
                            <input
                                ref={gameIdRef}
                                type="text"
                                pattern="^[0-9]{6}$"
                                maxLength="6"
                                placeholder="6-digit Game ID..."
                            />
                        </label>
                        <button type="submit">Join</button>
                    </form>
                </div>
                <button className="homepage_logout" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default HomePage;