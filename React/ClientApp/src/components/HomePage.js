import React, { useState } from 'react';
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

    const [serverData,setServerData] = useState({});

    GetData().then(x => setServerData(x))
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    const dataArray = [];
    const filterDataByDate = () => {

        dataArray.filter((job) => {
            const jobDate = new Date(job.date);
            const filterStartDate = new Date(startDate);
            const filterEndDate = new Date(endDate);
            return jobDate >= filterStartDate && jobDate <= filterEndDate;
        });
    };
    const test = () => {
        console.log(serverData);
    }

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
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                        <button onClick={filterDataByDate}>Date filter</button>
                    </div>
                </div>

                <div>
                    <Dropdown />
                </div>
            </div>
            <div>
                <Table />
            </div>
        </div>
    );
}