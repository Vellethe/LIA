function filterByFavorite(item, filterFavorite) {
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

function searchByLocation(item, location) {
    if (location === null) {
        return true;
    }
    const capitalLocation = location.charAt(0).toUpperCase() + location.slice(1);

    if (item.municipality && typeof item.municipality === "string") {
        return item.municipality.includes(capitalLocation);
    }

    return false
};

function filterDataByDate(item, startShowDate) {
    if (startShowDate === null) {
        return true;
    }
    if (new Date(item.postDate) >= new Date(startShowDate)) {
        return true;
    }
    return false;

};

export function filterAll(item, startShowDate, location, doFavoriteSort, searchTags, andMode) {
    return (
        filterByFavorite(item, doFavoriteSort) &&
        filterDataByDate(item, startShowDate) &&
        filterByTags(item, searchTags, andMode) &&
        searchByLocation(item, location)
    );
}


export function sortDate(item1, item2, isAscending) {
    if (isAscending) {
        return new Date(item1.postDate) - new Date(item2.postDate);
    }
    else {
        return new Date(item2.postDate) - new Date(item1.postDate);
    }
}
