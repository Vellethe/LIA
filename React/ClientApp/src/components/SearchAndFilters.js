import React, { useEffect, useState } from 'react';
import styles from './SearchAndFilters.module.css';
import { getTags } from "./../Helpers/apiCalls"
import Dropdown from './DropDown';
export const SearchAndFilters = ({ updateFilter, jobCount, isAscending, hidden, updateSort, sortType, users}) => {
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
        var favorite = formFields.favorite.checked;
        var tags = Array.from(document.getElementsByName("selectedTags")).filter(tag => tag.checked).map(x => x.value);

        locations = locations.length === 0 ? null : locations;
        date = date === '' ? null : date;

        updateFilter(date, locations, favorite, tags, keyword);
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
                                placeholder="Search for one or more locations"
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

                        <span id={styles.companies}>Amount of jobs: {jobCount}</span>

                        <label htmlFor={styles.favoriteCheckBox}>
                            <input type="checkbox" id={styles.favoriteCheckBox} onChange={submitForm} name="favorite"></input>
                            <span>Filter by favorites</span>
                        </label>

                        <Dropdown tags={tags} submitForm={submitForm} />

                        <div className={styles.arrowSort} onClick={() => { updateSort("company") }}>
                            {/*arrow*/}
                            <div className={arrowStateClass("company")} ></div>
                            <span>Company name</span>
                        </div>

                    </div>
                </div>

                <div id={styles.sorting} className={styles.arrowSort} onClick={() => { updateSort("date") }}>
                    {/*arrow*/}
                    <div className={arrowStateClass("date")} ></div>
                    <span> Date </span>
                </div>

            </div>
        </form>
    );
};