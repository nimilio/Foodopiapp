import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import usersService from "../services/users";
import "../style/LoginForm.css";
import ErrorNotification from "./Notification";

const Conditions = () => {
    return (
        <div className="terms-container">
            <h2>Terms and Conditions for Foodopiapp</h2>
            <p>Last Updated: 10/2023</p>

            <h3>1. Acceptance of Terms</h3>
            <p>
        By accessing and using Foodopiapp, you agree to comply with these terms and conditions.
            </p>

            <h3>2. Use of Content</h3>
            <p>
        You may access and use the recipes and content on the Website for personal, non-commercial purposes.
        You may not reproduce, distribute, or modify the content without proper attribution or permission.
            </p>

            <h3>3. Contact Information</h3>
            <p>If you have any questions or concerns, please do not hesitate to contact us .</p>
        </div>);
};

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [created, setCreated] = useState(null);
    const [checked, setCheck] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);



    const handleSignup = async (event) => {
        event.preventDefault();
        if (password === passwordConfirm){
            try {
                await usersService.register({
                    username,password,email
                });
                setCreated(true);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage("Login failed. Please check your credentials.");
                console.error (error);
            }
            setEmail("");
            setPassword("");
            setUsername("");
            setPasswordConfirm("");
        } else {
            setErrorMessage("Passwords do not match");
        }
    };

    const successMessage = () => {
        setTimeout(function() {
            const signMessage = document.querySelector(".sign-message");
            signMessage.classList.remove("fade-in");
            signMessage.classList.add("fade-out");
        }, 5000);

        setTimeout(function() {
            setCreated(null);
        }, 6000);
        return (
            <div className="sign-message fade-in">Account created!</div>
        );
    };

    const handleCheck = () => {
        setCheck(!checked);
    };

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };


    return (
        <div className="signup-form">
            <div className="signup-text">Not yet a member? Join us!</div>
            <form onSubmit={handleSignup}>
                <div>
        username
                    <input className="signup-form-input"
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
        password
                    <input className="signup-form-input"
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
        confirm password
                    <input className="signup-form-input"
                        type='password'
                        value={passwordConfirm}
                        name='PasswordConfirm'
                        onChange={({ target }) => setPasswordConfirm(target.value)}
                    />
                </div>
                <div>
        email <br></br>
                    <input className="signup-form-input"
                        type='email'
                        value={email}
                        name='Email'
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <div className="terms">
                    <label className="label-container">
                        <input
                            type='checkbox'
                            checked={checked}
                            onChange={handleCheck}
                        />
                        Agree with terms and conditions
                    </label>
                    <div className="circle-icon" onClick={togglePopup}>
                        <MdInfoOutline className="info-icon" />
                    </div>
                    <div>
                        {isPopupVisible && (
                            <div className="popup-content">
                                <button className="close-button-terms" onClick={togglePopup}>
                                    ✕
                                </button>
                                <p><Conditions/></p>
                            </div>
                        )}
                    </div>
                </div>

                <button className="signup-form-button" type='submit'
                    disabled={!username || !password || !passwordConfirm|| !email || !checked}>Sign up
                </button>
                
                {created ? successMessage() : null}
                {<ErrorNotification errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
            </form>
        </div>
    );
};

export default SignupForm;