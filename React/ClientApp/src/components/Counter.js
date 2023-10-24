import PropTypes from "prop-types";
import React from "react";
//import "./style.css";

export const NavBar = ({ selected, className }) => {
    return (
        <div className={`nav-bar ${className}`}>
            <div className={`about-button ${selected}`}>
                <div className="text-wrapper">Excluded</div>
            </div>
            <div className="overlap-group">
                <div className={`div-wrapper ${selected}`}>
                    <div className="div">Settings</div>
                </div>
                <div className={`home-button ${selected}`}>
                    <div className="text-wrapper-2">Home</div>
                </div>
            </div>
        </div>
    );
};

NavBar.propTypes = {
    selected: PropTypes.oneOf(["blacklisted", "home", "none", "favorites"]),
};
