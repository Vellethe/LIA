import React, { useEffect, useRef, useState, useLayoutEffect} from 'react';
import styles from "./HomePage.module.css";
import { Table } from './Table';
import { SearchAndFilters } from "./SearchAndFilters"
import { DescriptionPage } from './Description';
import { filterAll, sortAll, removeCompany } from './../Helpers/sorting'
import { getData, updateExluded, getCompanyCount, updateFavorite } from './../Helpers/apiCalls'

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
    const [keyword,setKeyword]  = useState("");

    const [isAscending, setIsAscending] = useState(false);
    const [sortType, setSortType] = useState("date");

    const test = useRef(0);


    function setSort(name) {
        if (sortType === name) {
            setIsAscending(!isAscending);
        }
        else {
            setSortType(name);
            setIsAscending(false);
        }
    }

    function setFilters(startDate, location, favoriteState, selectedTags, andMode, keyword) {
        setStartDate(startDate);
        setLocation(location);
        setFavoriteState(favoriteState);
        setSelectedTags(selectedTags);
        setAndMode(andMode);
        setKeyword(keyword);
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
        var filterdData = serverData.filter(job => filterAll(job, startDate, location, favoriteState, selectedTags, andMode, keyword))
        var sortedData = filterdData.sort((a, b) => { return sortAll(a, b, isAscending, sortType) });
        return sortedData;
    }

    const handleFavoriteCheckbox = async (event) => {
        var jobs = [...serverData];
        jobs.find(x => x.id === parseInt(event.currentTarget.id)).favorite = event.currentTarget.checked;
        setServerData(jobs);
        updateFavorite(event.currentTarget.id, event.currentTarget.checked);
    }

    function excludedHandeling(id,state){
        updateExluded(id, state);
        setServerData(removeCompany(serverData, id));
    }



    function ShowTableOrDescription(show) {
        if (show) {
            return <div>
                <Table
                    data={dataToShow(serverData)}
                    updateExluded={(id, state) => { excludedHandeling(id, state); }}
                    selectForShowFunc={(job) => { saveScrollPos(); setSelectedJob(job) }}
                    loadScroll={loadScrollPos}
                    saveScroll={saveScrollPos}
                    checkBoxFunc={handleFavoriteCheckbox}
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
        test.current = window.pageYOffset;
    }

    function loadScrollPos() {
        let scrollValue = test.current;
        window.scrollTo({ left: 0, top: scrollValue, behavior: "instant" });
        test.current = 0;
    }

    const scrollY = window.scrollY;
    useEffect(() => {
        if (selectedJob === null) {
            window.scrollTo({ left: 0, top: scrollY, behavior: "instant" });
        }
    } );

    var [x,setX] = useState({});
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

            <SearchAndFilters
                updateFilter={setFilters}
                hidden={false}
                companyCount={companyCount}
                isAscending={isAscending}
                setIsAscending={setIsAscending}
                updateSort={setSort}
                sortType={sortType}
                andMode={andMode}
            />

            <DescriptionPage
                job={selectedJob}
                favorite={selectedJob ? selectedJob.favorite : false}
                backButtonFunc={() => { setSelectedJob(null); setScrollTrigger({}); }}
                updateFavoriteFunc={handleFavoriteCheckbox}
            />

            {ShowTableOrDescription(selectedJob == null)}
        </div>
    );
}