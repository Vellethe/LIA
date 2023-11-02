import React from 'react';
import commonStylesTable from "./CommonTable.module.css"
import "./HomePage.module.css";

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
            <table className={commonStylesTable.table}>
                <thead className={commonStylesTable.thead}>
                <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Tags</th>
                    <th>Excluded</th>
                </tr>
                </thead>
                <tbody className={commonStylesTable.tbody}>
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
}
