import React, { useState } from "react";
import "./Table.css";
import { dataArray } from "./JobData"


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
            <div className="grid-container">
                <div className="grid-header">
                    <div className="grid-header-cell text">Company</div>
                    <div className="grid-header-cell text">Favorites</div>
                    <div className="grid-header-cell text">Excluded</div>
                    <div className="grid-header-cell name" onClick={() => sortName(isAscending)}>Date</div>
                </div>
                <div className="grid-body">
                    {jobData.map(job => (
                        <div className="grid" key={job.id}>
                            <div className="row1">
                                <div className="textName">{job.name}</div>
                            </div>
                            <div className="row2">
                                <div className="textLocation">{job.location}</div>
                                <div className="box"><input type="checkbox" /></div>
                                <div className="box"><input type="checkbox" /></div>
                                <div className="textDate">{job.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}