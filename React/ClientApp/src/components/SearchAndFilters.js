import React, { useEffect, useState, useRef } from 'react';
//TODO move css to own file
import styles from './SearchAndFilters.module.css';
import { updateFavorite, getTags, getCompanyCount } from "./../Helpers/apiCalls"
import Dropdown from './DropDown';
export const SearchAndFilters = ({ updateFilter, companyCount, hidden }) => {
    const [tags, setTags] = useState([]);
    const [isAscending, setAscending] = useState(true);



    //const sortDate = () => {
    //    //TODO rewrite to sort
    //    setAscending(!isAscending);
    //    const newData = [...serverData];
    //    newData.sort((a, b) => {
    //        if (isAscending) {
    //            return new Date(b.postDate) - new Date(a.postDate);
    //        }
    //        else {
    //            return new Date(a.postDate) - new Date(b.postDate);
    //        }
    //    });
    //    updateServerData(newData);
    //}


    useEffect(() => {
        getTags().then(x => {
            setTags(x);
        }
        )
    }, []);


    function tagFilterCallback(value) {
        //selectedTags.current = value;
        submitForm();
    }
    const filterFavoriteBox = async (event) => {
        //favoriteState.current = (event.currentTarget.checked);
        submitForm();
    }
    function submitForm() {
        document.getElementById("searchButtonHome").click();
    }


    const handleSearch = (e) => {
        e.preventDefault();
        var formFields = e.target.elements;
        var location = formFields.searchLocation.value;
        var date = formFields.test.value;
        var andMode = formFields.andMode.checked;
        var favorite = formFields.favorite.checked;
        var tags = Array.from(document.getElementsByName("selectedTags")).filter(tag => tag.checked).map(x=>x.value);

        location = location === '' ? null : location;
        date = date === '' ? null : date;

        //function setFilters(startDate, location, favoriteState, selectedTags, andMode) {
        updateFilter(date, location, favorite, tags, andMode);
    };
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
                                name="test"
                                type="month"
                            />
                            <button type="submit">Search</button>
                        </div>
                    </div>
                </div>

                <div className={styles.area}>
                    <input className={styles.andMode} type="checkbox" onChange={submitForm} name="andMode"></input>
                    <Dropdown tags={tags} submitForm={submitForm} />
                    <label for={styles.favoriteCheckBox}>
                        <input type="checkbox" id={styles.favoriteCheckBox} onChange={filterFavoriteBox} name="favorite"></input>
                        <span>Filter by favorites</span>
                    </label>
                    <span id={styles.companies}>Amount of companies: {companyCount}</span>
                    <button id={styles.sorting}
                        className={(isAscending ? "ascending" : "descending")}>
                        {isAscending ? "Oldest" : "Newest"}
                    </button>
                </div>
            </form>
        </div>
    );
};