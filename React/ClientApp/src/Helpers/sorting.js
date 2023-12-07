function filterByFavorite(item, filterFavorite,userId) {
    if (!filterFavorite) {
        return true;
    }

    return item.favorites.find((x) => x.id = userId) !== undefined;
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

function searchByLocation(item, locations) {

    //remove empty locations
    locations = locations.filter(x => x !== "");

    if (locations.length === 0) {
        return true; // If no locations specified, consider it a match
    }

    if (item.municipality && typeof item.municipality === "string") {
        return locations.some(location =>
            caseInsensitiveContains( item.municipality,location)
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
    return caseInsensitiveContains(item.description, keyword) || caseInsensitiveContains(item.role, keyword) || caseInsensitiveContains( item.company.name, keyword);
}

export function filterAll(item, startShowDate, locations, doFavoriteSort, searchTags,keyword,userId) {
    return (
        filterByFavorite(item, doFavoriteSort,userId) &&
        filterDataByDate(item, startShowDate) &&
        filterByTags(item, searchTags, false) &&
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

export function removeCompany(list, companyId) {
    var output = list.filter(item => item.company.id !== companyId);
    return output;
}

export function caseInsensitiveContains(findIn, toFind) {
    return findIn.toLowerCase().includes(toFind.toLowerCase());
}
