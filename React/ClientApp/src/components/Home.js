/* eslint-disable react/jsx-no-undef */
import React from 'react';
//import React from "react";
import "./HomePageStyle.css";
import { Table } from './Table';
import Dropdown from './DropDownMeny';

export const HomePage = () => {
    return (
        <div>
            <div>
                <h1>React Dropdown Menu</h1>
                <Dropdown />
            </div>
            <div>
                <Table />
            </div>

        </div>
    );
};