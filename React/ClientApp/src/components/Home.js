/* eslint-disable react/jsx-no-undef */
import React from 'react';
//import React from "react";
import "./HomePageStyle.css";
import { Table } from './Table';
import Dropdown from './DropDownMeny';

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
                </form>
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