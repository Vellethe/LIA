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
        var locations = formFields.searchLocation.value.split(/,|\s+/).map(location => location.trim());
        var keyword = formFields.searchJobs.value;
        var date = formFields.startDate.value;
        var andMode = formFields.andMode.checked;
        var favorite = formFields.favorite.checked;
        var tags = Array.from(document.getElementsByName("selectedTags")).filter(tag => tag.checked).map(x => x.value);

        locations = locations.length === 0 ? null : locations;
        date = date === '' ? null : date;

        //function setFilters(startDate, location, favoriteState, selectedTags, andMode,keyword) {
        updateFilter(date, locations, favorite, tags, andMode, keyword);
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

        <form onSubmit={handleSearch}>
            <div id={styles.searchStuff} style={hidden ? { display: 'none' } : {}}>
                <div className={styles.row1}>
                    <div id={styles.homeSearchFields}>
                        <div id={styles.searchRow} >
                            <input
                                id={styles.homeSearchJobs}
                                type="text"
                                name="searchJobs"
                                placeholder="Search for title, company or keywords"
                                onChange={submitForm}
                            />
                            <input
                                id={styles.homeSearchLocation}
                                type="text"
                                name="searchLocation"
                                placeholder="Location"
                                onChange={submitForm}
                            />
                            <input id={styles.dates}
                                name="startDate"
                                type="month"
                                onChange={submitForm}
                            />
                        </div>
                        {/*dont remove or rename id from button*/}
                        <button id="searchButtonHome" type="submit" hidden>Search</button>
                    </div>
                </div>

                <div className={styles.area}>
                    <div className={styles.searchGroup1}>

                        <span id={styles.companies}>Amount of jobs: {companyCount}</span>

                        <label for={styles.favoriteCheckBox}>
                            <input type="checkbox" id={styles.favoriteCheckBox} onChange={submitForm} name="favorite"></input>
                            <span>Filter by favorites</span>
                        </label>

                        <label>
                            <input type="checkbox"
                                onChange={submitForm} name="andMode"></input>
                            <span className={styles.andMode}>{andMode ? 'And' : 'Or'}</span>
                        </label>

                        <Dropdown tags={tags} submitForm={submitForm} />

                        <div className={styles.arrowSort}>
                            {/*arrow*/}
                            <div id={"nameSort"} className={arrowStateClass("company")} onClick={() => { updateSort("company") }}></div>
                            <span>Company name</span>
                        </div>

                    </div>
                </div>
                    <button id={styles.sorting}
                        onClick={() => { updateSort("date") }}
                    className={(isAscending ? "ascending" : "descending")}>
                    {sortType === "date"? (isAscending ? "Oldest" : "Newest"):"Date sort"}
                    </button>
            </div>
        </form>
    );
};