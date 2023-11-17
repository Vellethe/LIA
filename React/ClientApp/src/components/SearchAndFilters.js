import React, { useEffect, useState } from 'react';
import styles from './SearchAndFilters.module.css';
import { getTags } from "./../Helpers/apiCalls"
import Dropdown from './DropDown';
export const SearchAndFilters = ({ updateFilter, companyCount, isAscending, hidden, updateSort, sortType, andMode }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTags().then(x => {
            setTags(x);
        }
        )
    }, []);

    function submitForm() {
        document.getElementById("searchButtonHome").click();
    }

    const handleSearch = (e) => {
        e.preventDefault();
        var formFields = e.target.elements;
        var location = formFields.searchLocation.value;
        var date = formFields.startDate.value;
        var andMode = formFields.andMode.checked;
        var favorite = formFields.favorite.checked;
        var tags = Array.from(document.getElementsByName("selectedTags")).filter(tag => tag.checked).map(x => x.value);

        location = location === '' ? null : location;
        date = date === '' ? null : date;

        //function setFilters(startDate, location, favoriteState, selectedTags, andMode) {
        updateFilter(date, location, favorite, tags, andMode);
    };

    function arrowStateClass(name) {
        if (sortType !== name) {
            return styles.rightArrow;
        }

        if (isAscending) {
            return styles.downArrow
        }
        else {
            return styles.upArrow;
        }
    }

    return (

        <div id={styles.searchStuff} style={hidden ? { display: 'none' } : {}}>
            <form onSubmit={handleSearch}>
                <div className={styles.area}>
                    <div id={styles.homeSearchFields}>
                        <div id={styles.searchRow} >
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
                                name="startDate"
                                type="month"
                            />
                            {/*dont remove or rename id from button*/}
                            <button id="searchButtonHome" type="submit">Search</button>
                        </div>
                    </div>
                </div>

                <div className={styles.area}>
                    <span id={styles.companies}>Amount of jobs: {companyCount}</span>
                    <label for={styles.favoriteCheckBox}>
                        <input type="checkbox" id={styles.favoriteCheckBox} onChange={submitForm} name="favorite"></input>
                        <span>Filter by favorites</span>
                    </label>
                    <input type="checkbox"
                    onChange={submitForm} name="andMode"></input>
                    <span className={styles.andMode}>{andMode ? 'And' : 'Or'}</span>
                    <Dropdown tags={tags} submitForm={submitForm} />
                    <div id={styles.sortingContainer}>

                        <button id={styles.sorting}
                            onClick={() => { updateSort("date") }}
                            className={(isAscending ? "ascending" : "descending")}>
                            {isAscending ? "Oldest" : "Newest"}
                        </button>
                        <div id={"nameSort"} className={arrowStateClass("company")} onClick={() => { updateSort("company") }}></div>
                    </div>
                </div>
            </form>
        </div>
    );
};