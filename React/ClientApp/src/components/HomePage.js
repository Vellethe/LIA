/* eslint-disable react/jsx-no-undef */
import React from 'react';
//import React from "react";
import "./HomePage.css";
import { Table } from './Table';
import Dropdown from './DropDown';

export const HomePage = () => {
    return (
        <div>
            <div id="homeSearchFields">
                <form>
                    <input
                        id="homeSearchJobs"
                        type="text"
                        name="searchJobs"
                        placeholder="Search for title or keywords" />
                </form>
                <form>
                    <input
                        id="homeSearchLocation"
                        type="text"
                        name="searchLocation"
                        placeholder="Location" />
                        <button id="homeSearchButton" type="submit">Search</button>
                </form>
            </div>
            <div id="dates">
                <input type="date" />
                <input type="date" />
            </div>
            <div>
                <Dropdown />
            </div>
            <div>
                <Table />
            </div>

        </div>
    );
};