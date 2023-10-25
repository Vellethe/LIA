import React, { Component } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./Header.css"
import logo from "./../images/consat.png"

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        };
    }

    render() {
        return (
            <header>
                <div className="grid">
                    <img className="brand" alt="ConsatImg" src={logo} />
                    <ul className="links">
                        <li className="link"><Link to="/">Home</Link> </li>
                        <li className="link"><Link to="/settings">Settings</Link></li>
                        <li className="link"><Link to="/excluded">Excluded</Link></li>
                    </ul>
                    <div>
                        <img className="group" alt="Group" src="group.png" />
                        <div className="text-wrapper-3">Logout</div>
                    </div>

                </div>
            </header>
        )
    }
};
