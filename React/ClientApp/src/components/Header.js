import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styles from "./Header.module.css"
import logo from "./../images/consat.png"

export class Header extends Component {
    //constructor(props) {
    //    super(props)
    //    this.state = {
    //        collapsed: false
    //    };
    handleHomeClick = () => {
        const { history } = this.props;
        history.push('/');
    };

    render() {
        return (
            <header>
                <div className={styles.grid}>
                    <img className={styles.brand} alt="ConsatImg" src={logo} />
                    <ul className={styles.links}>
                        <li className={styles.link}><Link to="/" onClick={() => this.handleHomeClick()}>Home</Link> </li>
                        <li className={styles.link}><Link to="/settings">Settings</Link></li>
                        <li className={styles.link}><Link to="/excluded">Excluded</Link></li>
                    </ul>
                    {/*<div className={styles.logout}>*/}
                    {/*    <img className={styles.group} alt="Group" src={logout} />*/}
                    {/*    <div>Logout</div>*/}
                    {/*</div>*/}

                </div>
            </header>
        );
    }
}

export default (Header);

