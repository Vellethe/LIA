import React, { useState } from 'react';
import commonStylesTable from "./CommonTable.module.css"
import styles from "./HomePage.module.css";
import "./ExcludedPage.module.css"

export const ExcludedPage = () => {

    const [searchText, setSearchText] = useState("");
    const tableData = [
        ["Power", "Cookies Engineer", "MonsterFactory"],
        ["Puff", "Software Engineer", "Developer"],
        ["Pinglor", "Software Engineer", "Developer"],
        ["Med", "Software Engineer", "Developer"],
        ["Kakor", "Software Engineer", "Developer"],
    ];

    const filteredData = tableData.filter((row) =>
        row.some((cell) => cell.toLowerCase().includes(searchText.toLowerCase())
        ));
    return (
        <div>
            <input
                id={styles.settingsFreeSearch}
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Free search"
            />

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
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};