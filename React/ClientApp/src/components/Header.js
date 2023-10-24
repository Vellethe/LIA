import React from "react";
import { NavBar } from "./Navbar";
//import "./style.css";

export const Header = () => {
    return (
        <div className="header">
            <img className="image" alt="Image" src="image-28.png" />
            <NavBar className="nav-bar-instance" selected="none" />
            <img className="group" alt="Group" src="group.png" />
            <div className="text-wrapper-3">Logout</div>
        </div>
    );
};
