import React, { useEffect, useRef, useState } from 'react';
import styles from "./HomePage.module.css";
import { Table } from './Table';
import Dropdown from './DropDown';
import { DescriptionPage } from './Description';
import { /*fetchData*/getData, getTags, updateFavorite, updateExluded } from './../Helpers/apiCalls'

export const HomePage = () => {
    let allData = useRef([]);
    const [serverData, setServerData] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const favoriteState = useRef(false);
    const selectedTags = useRef([]);
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

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const filterDataByDate = (listToSort,date) => {
        if (date) {
            const filteredData = listToSort.filter((job) => {
                const jobDate = new Date(job.postDate);
                const filterStartDate = new Date(date);
                return jobDate >= filterStartDate;
            });
            return filteredData;
        }
        else
        {
            return listToSort;
        }

    };

    const searchByLocation = (listToSort,location) => {
        const capitalLocation = location.charAt(0).toUpperCase() + location.slice(1);

        const filteredData = listToSort.filter((job) => {
            if (job.municipality && typeof job.municipality === "string") {
                return job.municipality.includes(capitalLocation);
            }
            return false;
        });
        console.log(filteredData);
        return filteredData;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        var formFields = e.target.elements;
        var location = formFields.searchLocation.value;
        var date = formFields.test.value;

        var retainSort = allData.current;
        retainSort = searchByLocation(retainSort,location);
        retainSort = filterDataByDate(retainSort, date);

        retainSort = filterByTags(retainSort, selectedTags.current);
        /* filterDataByDate();*/ /*Not working function yet*/
        retainSort = filterByFavorite(retainSort, favoriteState.current);
        setServerData(retainSort);
    };

    function filterByTags(listToSort,tags) {
        //TODO and/or search 
        var output = listToSort.filter(x => {
            var tagsOnJob = x.tagJobs.map(y => y.tag.name);
            return tagsOnJob.some(z => tags.includes(z));
        });
        return output;
    }

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

    const filterFavoriteBox = async (event) => {
        favoriteState.current = (event.currentTarget.checked);
        document.getElementById("searchButtonHome").click();
    }

    const handleFavoriteCheckbox = async (event) => {
        allData.current.find(x => x.id === parseInt(event.currentTarget.id)).favorite = event.currentTarget.checked;
        updateFavorite(event.currentTarget.id, event.currentTarget.checked);
    }

    const filterByFavorite = (toSort, sort) => {
        if (sort) {
            var output = toSort.filter((job) => job.favorite === true);
            return output;
        }
        return toSort;
    };

    function tagFilterCallback(value){
        selectedTags.current = value;
        document.getElementById("searchButtonHome").click();
    }


    function ShowTableOrDescription(show) {
        if (show) {
            return <div>

                <div id={styles.searchStuff}>
                    <div className={styles.area}>
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
                                <input id={styles.dates}
                                        name="test"
                                        type="month"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                    />
                                <button id="searchButtonHome" type="submit">Search</button>
                            </form>
                        </div>
                    </div>

                    <div className={styles.area}>
                        <Dropdown tags={tags} chosenTagsCallback={ tagFilterCallback } />
                        <label for={styles.favoriteCheckBox}>
                            <input type="checkbox" id={styles.favoriteCheckBox} onChange={filterFavoriteBox}></input>
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

            <DescriptionPage job={selectedJob} favorite={selectedJob ? selectedJob.favorite : false} updateFavoriteFunc={handleFavoriteCheckbox} backButtonFunc={() => { setSelectedJob(null) }} />


            {ShowTableOrDescription(selectedJob == null)}
        </div>
    );
}