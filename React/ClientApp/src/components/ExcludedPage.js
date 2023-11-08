import React, { useState, useEffect } from 'react';
import commonStylesTable from "./CommonTable.module.css"
import styles from "./HomePage.module.css";
import "./ExcludedPage.module.css"



export const ExcludedPage = () => {

    const [reloadTrigger,setReloadTrigger] = useState({});

    async function getExclueded() {
        var url = "https://localhost:7273/api/companies?onlyExcluded=true";
        var response = await fetch(url, {
            method: "GET",
        })
        const data = await response.json()
        return data
    }

    async function updateExluded(id, state) {

        var url = `https://localhost:7273/api/excluded?id=${id}&isExcluded=${state}`;
        console.log(id, state);
        var response = await fetch(url, {
            method: "PUT",
        })
        setReloadTrigger({});
    }




    const [exludedCompanies, setExludedCompanies] = useState([]);
    useEffect(() => {
        getExclueded().then(x => {
            setExludedCompanies(x);
        }
        )
    }, [reloadTrigger]);

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
                    {exludedCompanies.map((row, index) => (
                        <tr key={index}>
                            <td>
                                {row.name}
                            </td>
                            <td>
                                <button id={styles.removeExcluded} onClick={() => updateExluded(row.id,false)}>Remove exclueded</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};