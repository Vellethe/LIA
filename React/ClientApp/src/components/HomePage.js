/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
//import React from "react";
import "./HomePage.css";
import { Table } from './Table';
import Dropdown from './DropDown';


export const HomePage = () => {

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

    return (
        <div>
            <div id="homeSearchFields">
                <form>
                    <input
                        id="homeSearchJobs"
                        type="text"
                        name="searchJobs"
                        placeholder="Search for title or keywords" />
                </form>
                <form>
                    <input
                        id="homeSearchLocation"
                        type="text"
                        name="searchLocation"
                        placeholder="Location" />
                    <button id="homeSearchButton" type="submit">Search</button>
                </form>
            </div>
            <div id="dates">
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
            <div>
                <Dropdown />
            </div>
            <div>
                <Table />
            </div>
        </div>
    );
};