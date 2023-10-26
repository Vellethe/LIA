/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
//import React from "react";
import "./HomePageStyle.css";
import { Table } from './Table';
import data from "./testingtags.json";
import Dropdown from './DropDownMeny';

export const HomePage = () => {
    return (<div>
        <div>
            <h1>React Dropdown Menu</h1>
            <Dropdown />
        </div>
    <div>
        <Table />
    </div>

    </div>        )
}


export const HomePage2 = () => {
    return (
        <div>
        <form>
                <input
                    id="SettingsFreeSearch"
                    type="text"
                    name="searchTags"
                    placeholder="Free search"/>
                </form>
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Tags</th>
                    <th>Excluded</th>
                </tr>
            </thead>
            <tbody>
                <td>Power</td>
                <td>Software Engineer</td>
                <td>Developer</td>
                <td><input type="checkbox"></input></td>
            </tbody>
            </table>
        </div>
    );
};