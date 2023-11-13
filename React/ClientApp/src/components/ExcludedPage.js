import React, { useState, useEffect } from 'react';
import commonStylesTable from "./CommonTable.module.css"
import styles from "./HomePage.module.css";
import "./ExcludedPage.module.css"
import { getExclueded, updateExluded } from './../Helpers/apiCalls'


export const ExcludedPage = () => {

    const [reloadTrigger,setReloadTrigger] = useState({});

    const [exludedCompanies, setExludedCompanies] = useState([]);
    useEffect(() => {
        getExclueded().then(x => {
            setExludedCompanies(x);
        }
        )
    }, [reloadTrigger]);

    const [searchText, setSearchText] = useState("");
    
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
                        <th>Include</th>
                    </tr>
                </thead>
                <tbody className={commonStylesTable.tbody}>
                    {exludedCompanies.map((row, index) => (
                        <tr key={index}>
                            <td>
                                {row.name}
                            </td>
                            <td>
                                <button id={styles.removeExcluded} onClick={async () => { await updateExluded(row.id, false); setReloadTrigger({}); }}>Remove exclueded</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};