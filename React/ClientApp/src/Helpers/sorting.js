﻿function filterByFavorite(item, filterFavorite) {
    if (!filterFavorite) {
        return true;
    }

    return item.favorite === true;
};

function filterByTags(item, searchTags, andMode) {

    if (searchTags.length === 0) {
        return true;
    }

    var tagsOnJob = item.tagJobs.map(y => y.tag.name);
    if (andMode) {
        return searchTags.every(searchTag => tagsOnJob.includes(searchTag));
    }
    else {
        return tagsOnJob.some(z => searchTags.includes(z));
    }
}

//function searchByLocation(item, locations) {
//    if (locations === null) {
//        return true;
//    }
//    const capitalLocation = locations.charAt(0).toUpperCase() + locations.slice(1);

//    if (item.municipality && typeof item.municipality === "string") {
//        return item.municipality.includes(capitalLocation);
//    }

//    return false;
//}
function searchByLocation(item, locations) {
    if (locations === null || locations.length === 0) {
        return true; // If no locations specified, consider it a match
    }

    // Convert the first letter of each location to uppercase
    const capitalizedLocations = locations.map(location =>
        location.charAt(0).toUpperCase() + location.slice(1)
    );

    if (item.municipality && typeof item.municipality === "string") {
        // Check if item's municipality includes any of the specified locations
        return capitalizedLocations.some(location =>
            item.municipality.includes(location)
        );
    }

    return false;
}

function filterDataByDate(item, startShowDate) {
    if (startShowDate === null) {
        return true;
    }
    if (new Date(item.postDate) >= new Date(startShowDate)) {
        return true;
    }
    return false;

};
function filterByKeyword(item, keyword) {
    if (keyword.length === 0) {
        return true;
    }

    return item.description.includes(keyword) || item.role.includes(keyword);
}

export function filterAll(item, startShowDate, locations, doFavoriteSort, searchTags, andMode,keyword) {
    return (
        filterByFavorite(item, doFavoriteSort) &&
        filterDataByDate(item, startShowDate) &&
        filterByTags(item, searchTags, andMode) &&
        searchByLocation(item, locations) &&
        filterByKeyword(item,keyword)
    );
}


function sortDate(date1, date2) {
    return new Date(date2) - new Date(date1);
}

function companySort(item1, item2) {
    item1 = item1.toLowerCase();
    item2 = item2.toLowerCase();

    if (item1 < item2) {
        return -1;
    }
    else if (item1 > item2) {
        return 1;
    }
    return 0;
}

export function sortAll(item1, item2, isAscending, sortType) {
    var output = 0;
    if (sortType === "date") {
        output = sortDate(item1.postDate, item2.postDate);
    }
    else if (sortType === "company") {
        output = companySort(item1.company.name, item2.company.name);
    }

    if (isAscending) {
        output = output * -1;
    }
    return output;
}
