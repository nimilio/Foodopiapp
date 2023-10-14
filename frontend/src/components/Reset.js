import React, { useState } from "react";
import "../style/Reset.css";
import Notification from "./Notification";
import usersService from "../services/users";


const ResetForm = () => {
    const [hide, setHide] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [notificationMessage, setNotificationMessage] = useState(null);

    const handleResetCode = async (event) => {
        event.preventDefault();
        try {
            const response = await usersService.reset({
                email
            });
            setNotificationMessage(response.message);
            setEmail("");
            setHide(true);
        } catch (error) {
            setNotificationMessage(error.response.data.error);
            console.error (error);
        }
    };

    const handleNewPass = async (event) => {
        event.preventDefault();
        if (password === passwordConfirm){
            try {
                const response = await usersService.newpass({
                    resetCode, password
                });
                setNotificationMessage(response.message);
                setPassword("");
                setPasswordConfirm("");
                setResetCode("");
            } catch (error) {
                setNotificationMessage(error.response.data.error);
                console.error (error);
            }
        } else {
            setNotificationMessage("Passwords do not match");
        }
    };


    return (
        <div className="reset-form">
            {!hide && (
                <form onSubmit={handleResetCode}>
                    <div>
            Enter your email and we will sent you a reset code
                        <input className="reset-form-input"
                            type='email'
                            value={email}
                            name='Email'
                            placeholder="Account Email"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>
                    <button className="reset-form-button" type='submit' disabled={!email}>Reset Password</button>
                    {notificationMessage && (
                        <Notification errorMessage={notificationMessage} setErrorMessage={setNotificationMessage} />
                    )}
                </form>
            )}
            {hide && (
                <form onSubmit={handleNewPass}>
                    <div>
            Enter the reset code and use a strong password
                    </div>
                    <br></br>
                    <div>
                        <input className="signup-form-input"
                            type='text'
                            value={resetCode}
                            name='ResetCode'
                            placeholder="Reset Code"
                            onChange={({ target }) => setResetCode(target.value)}
                        />
                    </div>
                    <div>
                        <input className="signup-form-input"
                            type='password'
                            value={password}
                            name='Password'
                            placeholder="new password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div>
                        <input className="signup-form-input"
                            type='password'
                            value={passwordConfirm}
                            name='PasswordConfirm'
                            placeholder="confirm new password"
                            onChange={({ target }) => setPasswordConfirm(target.value)}
                        />
                    </div>
                    <button className="reset-form-button" type='submit' disabled={!resetCode || !password ||!passwordConfirm}>RESET PASSWORD</button>
                    {notificationMessage && (
                        <Notification errorMessage={notificationMessage} setErrorMessage={setNotificationMessage} />
                    )}
                </form>
            )}
        </div>
    );
};

export default ResetForm;