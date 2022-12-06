import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import "./HomePage.css";
import { doc, setDoc, getDoc, getDocs, collection, arrayUnion, updateDoc } from "firebase/firestore";
import appRoutes from '../../shared/appRoutes';

function HomePage() {
    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [gamedata, setGamedata] = useState({});
    const [selectgameid, setSelectgameid] = useState("");
    const navigate = useNavigate();
    const gameIdRef = useRef(null);

    const joinGame = async (event) => {
        event.preventDefault();
        var gid = gameIdRef.current.value;
        const docRef = doc(db, "games", gid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (docSnap.data().players.length < 4) {
                await updateDoc(doc(db, "games", gid), {
                    players: arrayUnion({uid: user.uid, displayName: user.displayName})
                });
                navigate("/waiting/" + gid);
            }
            else {
                setError("Game session full, please join another game!");
            }
        } else {
            setError("No such Game ID, please try another one!");
        }
    };

    const createGame = async () => {
        var gid = Math.floor(100000 + Math.random() * 900000).toString();
        await setDoc(doc(db, "games", gid), {
            players: [{uid: user.uid, displayName: user.displayName}]
        });
        navigate("/waiting/" + gid);
    };

    const getGames = async () => {
        const games = await getDocs(collection(db, "games"));
        const tmpData = {};
        games.forEach((doc) => {
            tmpData[doc.id] = doc.data();
        });
        setGamedata(tmpData);
    }

    const inputGameid = (gid) => {
        setError("");
        setSelectgameid(gid);
    }

    useEffect(() => {
        if (!user) {
            return navigate(appRoutes.login);
        }
        else {
            setName(user.displayName);
            getGames();
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
                    <button className="homepage_createbtn" onClick={createGame}>
                        Create New Game
                    </button>
                    <form onSubmit={joinGame}>
                        <label>
                            Existing Game ID:
                            <input
                                ref={gameIdRef}
                                type="text"
                                pattern="^[0-9]{6}$"
                                maxLength="6"
                                placeholder="6-digit Game ID..."
                                defaultValue={selectgameid}
                            />
                        </label>
                        <button type="submit">Join</button>
                    </form>
                    <p>{error}</p>
                    <h3>Game Room &#129047;&#129047;&#129047;</h3>
                    <ul>
                        {Object.keys(gamedata).map((gid, idx) => {
                            var pnum = gamedata[gid].players.length;
                            if (pnum === 4) {
                                return (
                                    <li className="li_full" key={gid} onClick={() => inputGameid(gid)}>
                                        {gid}: Full... &nbsp;&nbsp;&nbsp;({gamedata[gid].players.length} / 4)
                                    </li>
                                );
                            }
                            else {
                                return (
                                    <li key={gid} onClick={() => inputGameid(gid)}>
                                        {gid}: Waiting<span className="waiting">... </span>({gamedata[gid].players.length} / 4)
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
                <button className="homepage_logout" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default HomePage;