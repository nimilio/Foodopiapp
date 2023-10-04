import React, { useState } from "react";
import usersService from "../services/users";
import recipesService from "../services/recipes";
import { useNavigate } from "react-router-dom";
import "../style/LoginForm.css";
import ErrorNotification from "./Notification";

const LoginForm = ({ setUser }) => {
    // app state has fields for username and password to store data from the form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);


    // button for Login form
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await usersService.login({
                username,password
            });
            recipesService.setToken(user.token);
            setUser(user);
            navigate("/my-recipes");
        } catch (error) {
            setErrorMessage("Login failed. Please check your credentials.");
            console.error (error);
        }
        setPassword("");
        setUsername("");
    };


    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <div>
        username
                    <input className="login-form-input"
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
        password
                    <input className="login-form-input"
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit' disabled={!username || !password}>Sign in</button>

                {errorMessage && (
                    <ErrorNotification errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                )}
            </form>
        </div>
    );
};

export default LoginForm;
