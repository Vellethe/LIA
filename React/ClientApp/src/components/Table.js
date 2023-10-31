import React, { useState } from "react";
import "./Table.css";

var dataArray = [
    { id: 1, name: "batman", role: "Hero", contactName: "Bruce Wane", date: "2023-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
    { id: 2, name: "joker", role: "Vilan", contactName: " The rideler", date: "2023-10-26", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
    { id: 3, name: "the rideler", role: "vilan", contactName: "Bruce Wane", date: "2022-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
    { id: 4, name: "Company A", role: "Cookiemonster", contactName: "Blue Creature", date: "2023-10-28 10:30:02", location: "Narnia", tags: ["friendly", "blue", "big"], favorit: true },
    { id: 5, name: "Company B", role: "Monstercookie", contactName: "Creature Blue", date: "2023-10-28 10:30:01", location: "Narnia", tags: ["friendly", "blue", "big"], favorit: true }
]


export const Table = () => {
    const [jobData, setJobData] = useState(dataArray);
    const [isAscending, setAscending] = useState(true);
    const [sortColumn, setSortColumn] = useState("date");

    const sortDate = () => {
        setSortColumn("date")
        setAscending(!isAscending);
        const newData = [...jobData];
        newData.sort((a, b) => {
            if (isAscending) {
                return new Date(b.date) - new Date(a.date);
            }
            else {
                return new Date(a.date) - new Date(b.date);
            }
        });
        setJobData(newData);
    }

    const sortName = () => {
        setSortColumn("date")
        setAscending(!isAscending);
        const newData = [...jobData];
        newData.sort((a, b) => {
            if (isAscending) {
                return a.date.localeCompare(b.date, undefined, { sensitivity: "base" });
            }
            else {
                return b.date.localeCompare(a.date, undefined, { sensitivity: "base" });
            }
        });
        setJobData(newData);
    }
    return (
        <div>
            <button
                onClick={sortDate}
                className={sortColumn === "date" ? (isAscending ? "ascending" : "descending") : ""}
            >
                {isAscending ? "Oldest" : "Newest"}
            </button>
            <div class="grid-container">
                <div class="grid-header">
                    <div class="grid-header-cell text">Company</div>
                    <div class="grid-header-cell text">Favorites</div>
                    <div class="grid-header-cell text">Excluded</div>
                    <div class="grid-header-cell name" onClick={() => sortName(isAscending)}>Date</div>
                </div>
                <div class="grid-body">
                    {jobData.map(job => (
                        <div class="grid" key={job.id}>
                            <div class="row row1">
                                <div class="cell text">{job.name}</div>
                            </div>
                            <div class="row row2">
                                <div class="cell text">{job.location}</div>
                                <div class="cell text"><input type="checkbox" /></div>
                                <div class="cell text"><input type="checkbox" /></div>
                                <div class="cell text">{job.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}