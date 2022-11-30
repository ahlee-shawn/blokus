import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import "./Waiting.css";
import { onSnapshot, doc, arrayRemove, updateDoc  } from "firebase/firestore";
import appRoutes from '../../../shared/appRoutes';

function Waiting() {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerNum, setPlayerNum] = useState(1);

    const stopWaiting = async() => {
        const gameDoc = doc(db, "games", id);
        await updateDoc(gameDoc, {
            players: arrayRemove(user.uid)
        });
        navigate(appRoutes.home);
    };

    useEffect(() => {
        if (!user) {
            return navigate(appRoutes.login);
        }
        onSnapshot(doc(db, "games", id), (doc) => {
            var pnum = doc.data().players.length;
            if (pnum === 4) {
                navigate("/game/" + id);
            }
            else {
                setPlayerNum(pnum);
            }
        });
    }, []);

    return (
        <div className="homepage">
            <div className="homepage_container">
                <h1>BLOKUS</h1>
                <p>A game where players try to win by
                    <br />occupying most of the board with pieces of their colour</p>
                <div className="homepage_gamebox">
                    <span className="loading">Waiting... </span>({playerNum} / 4)
                </div>
                <button className="homepage_logout" onClick={stopWaiting}>
                    Stop Waiting & Return to Home
                </button>
            </div>
        </div>
    );
}
export default Waiting;