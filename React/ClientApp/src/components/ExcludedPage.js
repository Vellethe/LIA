/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import Dropdown from './DropDownMeny';
//import React from "react";
import "./HomePageStyle.css";

export const ExcludedPage = () => {
    return (
        <div>
            <div>
                    <h1>React Dropdown Menu</h1>
                    <Dropdown/>
            </div>
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
