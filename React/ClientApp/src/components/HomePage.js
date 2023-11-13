import React, { useEffect, useRef, useState } from 'react';
import styles from "./HomePage.module.css";
import { Table } from './Table';
import Dropdown from './DropDown';
import { DescriptionPage } from './Description';
import { getData, getTags, updateFavorite, updateExluded } from './../Helpers/apiCalls'

export const HomePage = () => {
    let allData = useRef([]);
    const [serverData, setServerData] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [filteredData, setFilteredData] = useState(allData.current);
    const [currentLocation, setCurrentLocation] = useState("Home");
    const updateLocation = (location) => { setCurrentLocation(location); };
    const [tags, setTags] = useState([]);


    useEffect(() => {
        getTags().then(x => {
            setTags(x);
        }
        )
    }, []);

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


    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const filterDataByDate = () => {
        if (startDate) {
            const filteredData = allData.current.filter((job) => {
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

    const searchByLocation = (location) => {
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

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.searchLocation.value;
        searchByLocation(location);
       /* filterDataByDate();*/ /*Not working function yet*/
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

    function ShowTableOrDescription(show) {
        if (show) {
            return <div>

                <div id={styles.searchStuff}>
                    <div>
                        <div id={styles.homeSearchFields}>
                            <form id={styles.test} onSubmit={handleSearch}>
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
                        <Dropdown tags={tags} />
                        <label for={styles.favoriteCheckBox}>
                            <input type="checkbox" id={styles.favoriteCheckBox} onChange={filterDataByFavorite}></input>
                            <span>Filter by favorites</span>
                        </label>
                        <button id={styles.sorting}
                            onClick={sortDate}
                            className={(isAscending ? "ascending" : "descending")}>
                            {isAscending ? "Oldest" : "Newest"}
                        </button>
                    </div>
                </div>

                <Table
                    checkBoxFunc={handleFavoriteCheckbox}
                    data={serverData}
                    updateExluded={(id, state) => { updateExluded(id, state); setReloadTrigger({}); }}
                    selectForShowFunc={(job) => { setSelectedJob(job) }}
                    loadScroll={loadScrollPos}
                    saveScroll={saveScrollPos}
                />

            </div>
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
        <div id={styles.pageContainer}>
            {/* Breadcrumb Trail */}
            <div id={styles.breadcrumbs}>
                <span onClick={() => updateLocation('Home')}>Home</span>
                {selectedJob && (<>
                    <span>&nbsp;&gt;&nbsp;</span>
                    <span onClick={() => updateLocation('Description')}> Description</span>
                </>
                )}
            </div>

            <DescriptionPage job={selectedJob} favorite={selectedJob ? selectedJob.favorite : false} updateFavoriteFunc={updateFavoriteFunc} backButtonFunc={() => { setSelectedJob(null) }} />


            {ShowTableOrDescription(selectedJob == null)}
        </div>
    );
}