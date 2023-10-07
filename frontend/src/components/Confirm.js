import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usersService from "../services/users";

const Confirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const [confirmationStatus, setConfirmationStatus] = useState("Confirming..."); 

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await usersService.confirm({ token });
                setConfirmationStatus(response.message); // successful
            } catch (error) {
                setConfirmationStatus(error.response.data.error); // network or other error
                console.error(error);
            }
        };
        confirmEmail();
    }, []);

    return (
        <div>
            {confirmationStatus}
        </div>
    );
};

export default Confirmation;
