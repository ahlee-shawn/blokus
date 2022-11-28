import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import appRoutes from '../../shared/appRoutes';

function Login() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(appRoutes.home);
        }
    }, [user]);

    return (
        <div className="login">
            <div className="login_container">
                <div className="login_box">
                    <h1>Welcome to Blokus!</h1>
                    <button className="login_btn" onClick={signInWithGoogle}>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Login;