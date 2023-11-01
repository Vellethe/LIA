import React, { useState } from "react";
import x from "./../images/Red_X.png"
import styles from "./Table.module.css";
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
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.text}>Company</div>
                    <div className={styles.text}>Favorites</div>
                    <div className={styles.text}>Excluded</div>
                    <div className={styles.name} onClick={() => sortName(isAscending)}>Date</div>
                </div>
                <div className={styles.body} >
                    {jobData.map(job => (
                        <div className={styles.gridHome} key={job.id}>
                            <div className={styles.jobTitle}> Cool job </div>
                            <div className={styles.desciptionGrid}>
                                <div className={styles.textName}>{job.name}</div>
                                <button className={`${styles.box} ${styles.exclude}`} onClick={() => console.log("tignsnagn")}><img src={x} alt="X" /></button>
                                <div className={styles.textLocation}>{job.location}</div>
                            </div>
                            <div className={`${styles.box} ${styles.star}`}>
                                <input type="checkbox" />
                            </div>
                            <div className={styles.textDate}>{job.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}