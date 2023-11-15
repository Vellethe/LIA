import React, { useEffect, useRef, useState } from 'react';
import styles from "./HomePage.module.css";
import { Table } from './Table';
import { SearchAndFilters } from "./SearchAndFilters"
import { DescriptionPage } from './Description';
import { /*fetchData*/getData, getTags, updateFavorite, updateExluded } from './../Helpers/apiCalls'
import { filterAll } from './../Helpers/sorting'

export const HomePage = () => {
    const [serverData, setServerData] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentLocation, setCurrentLocation] = useState("Home");
    const updateLocation = (location) => { setCurrentLocation(location); };



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
        });
    }, [reloadTrigger]);


    function ShowTableOrDescription(show) {
        if (show) {
/*TODO make favorite work again*/
            return <div>
                <Table
                    data={serverData.filter(job => filterAll(job, startDate, location, favoriteState, selectedTags, andMode))}
                    updateExluded={(id, state) => { updateExluded(id, state); setReloadTrigger({}); }}
                    selectForShowFunc={(job) => { setSelectedJob(job) }}
                    loadScroll={loadScrollPos}
                    saveScroll={saveScrollPos}
                />
                    {/*checkBoxFunc={handleFavoriteCheckbox}*/}
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
            <SearchAndFilters updateFilter={setFilters} hidden={false} />
{/*TODO make favorite work again*/}
            <DescriptionPage
                job={selectedJob}
                favorite={selectedJob ? selectedJob.favorite : false}
                backButtonFunc={() => { setSelectedJob(null) }}
            />

                {/*updateFavoriteFunc={handleFavoriteCheckbox}*/}

            {ShowTableOrDescription(selectedJob == null)}
        </div>
    );
}