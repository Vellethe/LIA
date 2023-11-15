import React, { useEffect, useRef, useState } from 'react';
import styles from "./HomePage.module.css";
import { Table } from './Table';
import { SearchAndFilters } from "./SearchAndFilters"
import { DescriptionPage } from './Description';
import { filterAll } from './../Helpers/sorting'
import { /*fetchData*/getData, updateExluded, getCompanyCount, updateFavorite } from './../Helpers/apiCalls'

export const HomePage = () => {
    const [serverData, setServerData] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentLocation, setCurrentLocation] = useState("Home");
    const updateLocation = (location) => { setCurrentLocation(location); };

    const [companyCount, setCompanyCount] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [andMode,setAndMode] = useState(false);
    const [selectedTags,setSelectedTags] = useState([]);
    const [favoriteState,setFavoriteState]  = useState(false);
    const [location,setLocation]  = useState("");


    function setFilters(startDate, location, favoriteState, selectedTags, andMode) {
        setStartDate(startDate);
        setLocation(location);
        setFavoriteState(favoriteState);
        setSelectedTags(selectedTags);
        setAndMode(andMode);
    }

    useEffect(() => {
        getData().then(x => {
            setServerData(x);
            getCompanyCount().then(count => setCompanyCount(count));
        });
    }, [reloadTrigger]);

    useEffect(() => {
        setCompanyCount(dataToShow().length);
    });

    function dataToShow() {
        //TODO add use memo
        var result = serverData.filter(job => filterAll(job, startDate, location, favoriteState, selectedTags, andMode));
        return result;
    }

    const handleFavoriteCheckbox = async (event) => {
        var jobs = [...serverData];
        jobs.find(x => x.id === parseInt(event.currentTarget.id)).favorite = event.currentTarget.checked;
        setServerData(jobs);
        updateFavorite(event.currentTarget.id, event.currentTarget.checked);
    }

    function ShowTableOrDescription(show) {
        if (show) {
/*TODO make favorite work again*/
            return <div>

                <Table
                    data={dataToShow(serverData)}
                    updateExluded={(id, state) => { updateExluded(id, state); setReloadTrigger({}); }}
                    selectForShowFunc={(job) => { setSelectedJob(job) }}
                    loadScroll={loadScrollPos}
                    saveScroll={saveScrollPos}
                    checkBoxFunc={handleFavoriteCheckbox}
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
            <SearchAndFilters updateFilter={setFilters} hidden={false} companyCount={companyCount} />
{/*TODO make favorite work again*/}
            <DescriptionPage
                job={selectedJob}
                favorite={selectedJob ? selectedJob.favorite : false}
                backButtonFunc={() => { setSelectedJob(null) }}
                updateFavoriteFunc={handleFavoriteCheckbox}
            />


            {ShowTableOrDescription(selectedJob == null)}
        </div>
    );
}