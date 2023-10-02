import React, { useState } from "react";
import usersService from "../services/users";
import "../style/LoginForm.css";
import ErrorNotification from "./Notification";


const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [created, setCreated] = useState(null);


    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await usersService.register({
                username,password,email
            });
            setCreated(true);
        } catch (error) {
            setErrorMessage("Login failed. Please check your credentials.");
            console.error (error);
        }
        setEmail("");
        setPassword("");
        setUsername("");
    };



    return (
        <div className="signup-form">
            <div className="signup-text">Not yet a member? Join us!</div>
            <form onSubmit={handleSignup}>
                <div>
        username
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
        password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
        email <br></br>
                    <input
                        type='email'
                        value={email}
                        name='Email'
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <button type='submit' disabled={!username || !password || !email}>Sign up</button>
                {created ? <div className="login-message">
          Account created!
                </div> : null}
                {errorMessage && (
                    <ErrorNotification errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                )}
            </form>
        </div>
    );
};

export default SignupForm;
