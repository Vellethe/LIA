import React, { useEffect, useState } from 'react';
import styles from "./HomePage.module.css";
import { Table } from './Table';
import Dropdown from './DropDown';

var url = "https://localhost:7273/api?page=0";

async function GetData() {
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}

export const HomePage = () => {

    const [serverData, setServerData] = useState([]);
    useEffect(() => {
        GetData().then(x => setServerData(x))
    },[]);

    const [startDate, setStartDate] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const filterDataByDate = () => {
        const filteredData = serverData.filter((job) => {
            const jobDate = new Date(job.date);
            const filterStartDate = new Date(startDate);
            return jobDate >= filterStartDate;
        });

        setServerData(filteredData);
    };

    return (
        <div>
            <div id={styles.searchStuff}>
                <div>
                    <div id={styles.homeSearchFields}>
                        <form>
                            <input
                                id={styles.homeSearchJobs}
                                type="text"
                                name="searchJobs"
                                placeholder="Search for title or keywords" />
                            <input
                                id={styles.homeSearchLocation}
                                type="text"
                                name="searchLocation"
                                placeholder="Location" />
                            <button id="homeSearchButton" type="submit">Search</button>
                        </form>
                    </div>
                    <div id={styles.dates}>
                        <input
                            type="month"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                        <button onClick={filterDataByDate}>Date filter</button>
                    </div>
                </div>

                <div>
                    <Dropdown />
                </div>
            </div>
            <div>
                <Table data={serverData} />
            </div>
        </div>
    );
}