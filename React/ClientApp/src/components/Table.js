import React, { useState } from "react";
import x from "./../images/Red_X.png"
import styles from "./Table.module.css";
import { dataArray } from "./JobData"


export function Table({ data }) {
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

    const formatDate = (input) => {
        var date = new Date(input);
        var output = `
        ${date.getFullYear()}-
        ${("0" + date.getMonth()).slice(-2)}-
        ${("0" + date.getDay()).slice(-2)}`;
        return output;
    }

    return (
        <div>
            <button
                onClick={sortDate}
                className={sortColumn === "date" ? (isAscending ? "ascending" : "descending") : ""}
            >
                {isAscending ? "Oldest" : "Newest"}
            </button>
                <div className={styles.body} >
                    {data.map(job => (
                        <div className={styles.gridHome} key={job.id}>
                            <div className={styles.jobTitle}> {job.role}</div>
                            <div className={styles.desciptionGrid}>
                                <div className={styles.textName}>{job.company.name}</div>
                                <button className={`${styles.box} ${styles.exclude}`} onClick={() => console.log("tignsnagn")}><img src={x} alt="X" /></button>
                                <div className={styles.textLocation}>{job.municipality}</div>
                            </div>
                            <div className={`${styles.box} ${styles.star}`}>
                                <input type="checkbox" />
                            </div>
                            <div className={styles.textDate}>{formatDate(job.postDate)}</div>
                        </div>
                    ))}
                </div>
        </div>
    );
}