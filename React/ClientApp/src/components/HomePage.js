import React, { useEffect, useRef, useState } from 'react';
import styles from "./HomePage.module.css";
import { SearchAndFilters } from "./SearchAndFilters"
import { DescriptionPage } from './Description';
import { filterAll, sortAll, removeCompany } from './../Helpers/sorting'
import { getData, updateExluded, getUsers, updateFavorite } from './../Helpers/apiCalls'
import { JobList } from './JobList';
import { parseTags } from '../Helpers/formating';

export const HomePage = () => {
    const [serverData, setServerData] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentLocation, setCurrentLocation] = useState("Home");
    const updateLocation = (location) => { setCurrentLocation(location); };

    const [jobCount, setjobCount] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [favoriteState, setFavoriteState] = useState(false);
    const [location, setLocation] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [isAscending, setIsAscending] = useState(false);
    const [sortType, setSortType] = useState("date");

    const scrollPos = useRef(0);

    const [selectedUserId, setSelectedUserId] = useState(1);

    const [users, setUsers] = useState([
    ]
    )


    function setSort(name) {
        if (sortType === name) {
            setIsAscending(!isAscending);
        }
        else {
            setSortType(name);
            setIsAscending(false);
        }
    }

    function setFilters(startDate, location, favoriteState, selectedTags, keyword) {
        setStartDate(startDate);
        setLocation(location);
        setFavoriteState(favoriteState);
        setSelectedTags(selectedTags);
        setKeyword(keyword);
    }

    useEffect(() => {
        getData().then(x => {
            setServerData(x);
        });
        getUsers().then(x => {
            setUsers(x);
        });
    }, []);


    useEffect(() => {
        setjobCount(dataToShow().length);
    });

    function dataToShow() {
        var filterdData = serverData.filter(job => filterAll(job, startDate, location, favoriteState, selectedTags, keyword, selectedUserId))
        var sortedData = filterdData.sort((a, b) => { return sortAll(a, b, isAscending, sortType) });
        return sortedData;
    }

    const handleUserChange = (event) => {
        const newUserId = parseInt(event.target.value);
        setSelectedUserId(newUserId);
    };

    const handleFavoriteCheckbox = async (event) => {
        var jobs = [...serverData];

        var selectedJob = jobs.find(x => x.id === parseInt(event.currentTarget.id));

        if (event.currentTarget.checked) {
            selectedJob.favorites.push({ id: -1, user: { id: selectedUserId } });
        }
        else {
            selectedJob.favorites = selectedJob.favorites.filter(favorite => favorite.user.id !== selectedUserId);
        }
        setServerData(jobs);
        updateFavorite(event.currentTarget.id, event.currentTarget.checked, selectedUserId);
    }

    function excludedHandeling(id, state) {
        updateExluded(id, state);
        setServerData(removeCompany(serverData, id));
    }

    function ShowTableOrDescription(show) {
        if (show) {
            return <div>
                <JobList
                    data={dataToShow(serverData)}
                    updateExluded={(id, state) => { excludedHandeling(id, state); }}
                    selectForShowFunc={(job) => { saveScrollPos(); setSelectedJob(job) }}
                    saveScroll={saveScrollPos}
                    checkBoxFunc={handleFavoriteCheckbox}
                    userId={selectedUserId}
                />
            </div>
        }
        else {
            return null;
        }
    }
    //code for retention of page position between actions
    const [scrollTrigger, setScrollTrigger] = useState({});
    function saveScrollPos() {
        scrollPos.current = window.pageYOffset;
    }

    function loadScrollPos() {
        let scrollValue = scrollPos.current;
        window.scrollTo({ left: 0, top: scrollValue, behavior: "instant" });
        scrollPos.current = 0;
    }

    const scrollY = window.scrollY;
    useEffect(() => {
        if (selectedJob === null) {
            window.scrollTo({ left: 0, top: scrollY, behavior: "instant" });
        }
    });

    useEffect(() => {
        loadScrollPos();
    }, [scrollTrigger])

    return (
        <div id={styles.pageContainer}>
            {/* Breadcrumb Trail */}
            <div className={styles.breadcrumbs}>
                <span onClick={() => updateLocation('Home')}>Home</span>
                {selectedJob && (<>
                    <span>&nbsp;&gt;&nbsp;</span>
                    <span onClick={() => updateLocation('Description')}> Description</span>
                </>
                )}
            </div>

            <div className={styles.users}>
                <label htmlFor="userSelect">Select User: </label>
                <select id="userSelect" onChange={handleUserChange} value={selectedUserId}>
                    {users.map((user) => (
                        <option  value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <SearchAndFilters
                updateFilter={setFilters}
                hidden={selectedJob !== null}
                jobCount={jobCount}
                isAscending={isAscending}
                setIsAscending={setIsAscending}
                updateSort={setSort}
                sortType={sortType}
            />

            <DescriptionPage
                job={selectedJob}
                favorite={selectedJob ? selectedJob.favorite : false}
                backButtonFunc={() => { setSelectedJob(null); setScrollTrigger({}); }}
                updateFavoriteFunc={handleFavoriteCheckbox}
                userId={selectedUserId}
            />

            {ShowTableOrDescription(selectedJob == null)}
        </div>
    );
}