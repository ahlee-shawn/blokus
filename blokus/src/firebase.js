import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";

// const Config = {
//     apiKey: "AIzaSyD8lEbCyxdj4VWy7id-VNzws9guE0GK7AU",
//     authDomain: "blokus-75a07.firebaseapp.com",
//     projectId: "blokus-75a07",
//     storageBucket: "blokus-75a07.appspot.com",
//     messagingSenderId: "1031001896653",
//     appId: "1:1031001896653:web:12b840b2c4384fdadb9b84"
// };


// melody DB
const Config = {
    apiKey: "AIzaSyD4xiS5ZeVfU7buKBgOoJOxU83UDCtNzdc",
    authDomain: "ssui-final-project-caf31.firebaseapp.com",
    projectId: "ssui-final-project-caf31",
    storageBucket: "ssui-final-project-caf31.appspot.com",
    messagingSenderId: "263947149135",
    appId: "1:263947149135:web:7247512da5f328108e6f3a"
};

const app = initializeApp(Config);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
    }
};

const logout = () => {
    signOut(auth);
};

const getGameInfo = async (sessionId) => {
    const q = doc(db, "games", sessionId)
    const gameDoc = await getDoc(q);

    var gameInfo = {
        players: gameDoc.data().players,
        currPlayer: gameDoc.data().currPlayer,
        gameBoard: gameDoc.data().gameBoard,
        playerChessList: gameDoc.data().playerChessList,
        playerScore: gameDoc.data().playerScore,
    };
    return gameInfo;
}

const updateGame = async (sessionId, updateInfo) => {
    await updateDoc(doc(db, "games", sessionId), updateInfo);
}

export {
    auth,
    db,
    signInWithGoogle,
    logout,
    getGameInfo,
    updateGame,
};