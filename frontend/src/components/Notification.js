
import React from "react";

const Notification = ({ errorMessage, setErrorMessage }) => {

    // use inline style to overwrite custom style
    const closeButtonStyle = {
        position: "absolute",
        top: "11px",
        right: "10px",
        cursor: "pointer",
        fontSize: "15px",
        color: "floralwhite",
        background: "none",
        textAlign:"end"
    };

    const handleClose = () => {
        setErrorMessage(null);
        return null;
    };

    if (errorMessage === null) {
        return null;
    }
    return (
        <div className="error-notification">
            {errorMessage}
            <button
                onClick={handleClose}
                style={closeButtonStyle}
            >
            &#x2715;
            </button>

        </div>
    );
};

export default Notification;