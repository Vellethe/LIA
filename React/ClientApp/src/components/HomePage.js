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
    const [reloadTrigger, setReloadTrigger] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [filteredData, setFilteredData] = useState(allData.current);

    useEffect(() => {
        getData().then(x => {
            setServerData(x);
            allData.current = x;
        }
        )
    }, [reloadTrigger]);

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

    async function updateExluded(id, state) {

        var url = `https://localhost:7273/api/excluded?id=${id}&isExcluded=${state}`;
        console.log(id, state);
        var response = await fetch(url, {
            method: "PUT",
        })
        setReloadTrigger({});
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const filterDataByDate = () => {
        if (startDate) {
            const filteredData = serverData.filter((job) => {
                const jobDate = new Date(job.postDate);
                const filterStartDate = new Date(startDate);
                return jobDate >= filterStartDate;
            });

            setServerData(filteredData);
        }
        else
        {
            setServerData(allData.current);
        }

    };

    const [searchLocation, setSearchLocation] = useState("");

    const searchByLocation = (e) => {
        e.preventDefault();
        const location = e.target.searchLocation.value;
        const capitalLocation = location.charAt(0).toUpperCase() + location.slice(1);
        setSearchLocation(capitalLocation);

        const filteredData = allData.current.filter((job) => {
            if (job.municipality && typeof job.municipality === "string") {
                return job.municipality.includes(capitalLocation);
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

            filteredData = serverData.filter((job) => job.favorite === true);
        }

        if (searchLocation !== "") {
            filteredData = filteredData.filter((job) => {
                if (job.municipality && typeof job.municipality === "string") {
                    return job.municipality.includes(searchLocation);
                }
                return false;
            });
        }

        setServerData(filteredData);
    };
    const updateFavoriteFunc = (event) => {
        if (selectedJob) {
            
            const selectedJobID = selectedJob.id;

            const updatedServerData = serverData.map((job) => {
                if (job.id === selectedJobID) {
                    
                    return { ...job, favorite: event.target.checked };
                }
                return job;
            });

            setServerData(updatedServerData);
        }
    };

    function showTable(show) {
        if (show) {
            return <Table
                checkBoxFunc={handleFavoriteCheckbox}
                data={serverData}
                updateExluded={updateExluded}
                selectForShowFunc={(job) => { setSelectedJob(job) }}
                loadScroll={loadScrollPos}
                saveScroll={saveScrollPos}
            />
        }
        else {
            saveScrollPos();
            return null;
        }
    }

    function saveScrollPos() {
        sessionStorage.setItem("scroll", window.pageYOffset);
    }

    function loadScrollPos() {
        let scrollValue = sessionStorage.getItem("scroll");
        window.scrollTo({ left: 0, top: scrollValue, behavior: "instant" });
        sessionStorage.removeItem("scroll");
    }


    return (
        <div>

            <DescriptionPage job={selectedJob} favorite={selectedJob ? selectedJob.favorite : false} updateFavoriteFunc={updateFavoriteFunc} backButtonFunc={() => { setSelectedJob(null) }} />


            <div id={styles.searchStuff}>
                <div>
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
                    <button id={styles.sorting}
                        onClick={sortDate}
                        className={(isAscending ? "ascending" : "descending")}>
                        {isAscending ? "Oldest" : "Newest"}
                    </button>
                    <label for={styles.favoriteCheckBox}>
                        <input type="checkbox" id={styles.favoriteCheckBox} onChange={filterDataByFavorite}></input>
                        <span>Filter by favorites</span>
                    </label>

                </div>
            </div>
            <div>
                {showTable(selectedJob == null)}
            </div>
        </div>
    );
}