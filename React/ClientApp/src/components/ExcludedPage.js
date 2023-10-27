/* eslint-disable react/jsx-no-undef */
import React from 'react';
//import React from "react";
import "./HomePageStyle.css";

export const ExcludedPage = () => {
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
                    <tr>
                        <td>Power</td>
                        <td>Software Engineer</td>
                        <td>Developer</td>
                        <td><input type="checkbox"></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
