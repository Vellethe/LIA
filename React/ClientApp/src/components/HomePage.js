import React, { useEffect, useRef, useState } from 'react';
import styles from "./HomePage.module.css";
import { Table } from './Table';
import Dropdown from './DropDown';
import { DescriptionPage } from './Description';


async function getData() {
    var url = "https://localhost:7273/api/jobs?page=0";
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}
async function updateFavorite(id, state) {

    var url = `https://localhost:7273/api/favorite?id=${id}&isFavorite=${state}`;
    console.log(id, state);
    var response = await fetch(url, {
        method: "PUT",
    })
}

export const HomePage = () => {
    let allData = useRef([]);
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        getData().then(x => {
            setServerData(x);
            allData.current = x;

        }
        )
    }, []);

    const [startDate, setStartDate] = useState('');

    const handleFavoriteChange = (jobId, newFavoriteValue) => {
        const updatedServerData = serverData.map(job => {
            if (job.id === jobId) {
                return { ...job, favorite: newFavoriteValue };
            }
            return job;
        });
        setServerData(updatedServerData);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const filterDataByDate = () => {
        const filteredData = allData.current.filter((job) => {
            const jobDate = new Date(job.postDate);
            const filterStartDate = new Date(startDate);
            return jobDate >= filterStartDate;
        });

        setServerData(filteredData);

    };

    const [searchLocation, setSearchLocation] = useState("");

    const searchByLocation = (e) => {
        e.preventDefault();
        const location = e.target.searchLocation.value;
        setSearchLocation(location);
        const filteredData = allData.current.filter((job) => {
            if (job.municipality && typeof job.municipality === "string") {
                return job.municipality.includes(location);
            }
            return false;
        });
        console.log(filteredData);
        setServerData(filteredData)
    };
   

    const [isAscending, setAscending] = useState(true);

    const sortDate = () => {
        setAscending(!isAscending);
        const newData = [...serverData];
        newData.sort((a, b) => {
            if (isAscending) {
                return new Date(b.postDate) - new Date(a.postDate);
            }
            else {
                return new Date(a.postDate) - new Date(b.postDate);
            }
        });
        setServerData(newData);
    }

    const handleFavoriteCheckbox = (event) => {
        var x = "a";
        //TODO checks not saved in ref
        allData.current.find(x => x.id == event.currentTarget.id).favorite = event.currentTarget.checked;
        updateFavorite(event.currentTarget.id, event.currentTarget.checked);
    }

    const filterDataByFavorite = (state) => {
        var filteredData = allData.current;
        if (state.currentTarget.checked === true) {

            filteredData = allData.current.filter((job) => {
                return job.favorite === true;
            });
        }

        setServerData(filteredData);
    }


    return (
        <div>
            <div id={styles.searchStuff}>
                <div>
                    <input type="checkbox" onChange={filterDataByFavorite}></input>
                    <button
                        onClick={sortDate}
                        className={(isAscending ? "ascending" : "descending")}>
                        {isAscending ? "Oldest" : "Newest"}
                    </button>
                    <div id={styles.homeSearchFields}>
                        <form id={styles.test} onSubmit={searchByLocation}>
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
                <Table checkBoxFunc={handleFavoriteCheckbox} data={serverData} />
            </div>
            <div>
                {/* Render a Description component for each job in serverData */}
                {serverData.map((jobData) => (
                    <DescriptionPage
                        key={jobData.id}
                        job={jobData}
                        favorite={jobData.favorite}
                        onFavoriteChange={(newFavoriteValue) => handleFavoriteChange(jobData.id, newFavoriteValue)}
                    />
                ))}
            </div>
        </div>
    );
}