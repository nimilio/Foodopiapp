import React from "react";
import "../style/Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Welcome to our recipe website where you can explore a wide range of delicious recipes to try at home.</p>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>If you have any questions or suggestions, feel free to <a href="https://www.linkedin.com/in/nikolina-milioni/" target="_blank" rel="noopener noreferrer">contact us</a>.</p>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://icons8.com/icon/63676/pinterest" target="_blank" rel="noopener noreferrer">
                            <img src= '/images/pinterest.png' alt="Pinterest" />
                        </a>
                        <a href="https://icons8.com/icons/set/social-media" target="_blank" rel="noopener noreferrer">
                            <img src='/images/instagram.png' alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Copyright = () => {
    return (
        <div className="copyright">
      &copy; {new Date().getFullYear()} Foodopiapp. All rights reserved.
        </div>
    );
};

export { Footer, Copyright };
