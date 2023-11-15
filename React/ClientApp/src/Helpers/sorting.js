export function filterByFavorite(toSort, sort) {
    if (sort) {
        var output = toSort.filter((job) => job.favorite === true);
        return output;
    }
    return toSort;
};

export function filterByTags(listToSort, tags, andMode) {

    if (tags.length === 0) {
        return listToSort;
    }

    var output = listToSort.filter(x => {
        var tagsOnJob = x.tagJobs.map(y => y.tag.name);
        if (andMode) {
            return tags.every(z => tagsOnJob.includes(z));
        }
        else {
            return tagsOnJob.some(z => tags.includes(z));
        }
    });
    return output;
}

export function searchByLocation(listToSort, location) {
    const capitalLocation = location.charAt(0).toUpperCase() + location.slice(1);

    const filteredData = listToSort.filter((job) => {
        if (job.municipality && typeof job.municipality === "string") {
            return job.municipality.includes(capitalLocation);
        }
        return false;
    });
    return filteredData;
};

export function filterDataByDate(listToSort, date) {
    if (date) {
        const filteredData = listToSort.filter((job) => {
            const jobDate = new Date(job.postDate);
            const filterStartDate = new Date(date);
            return jobDate >= filterStartDate;
        });
        return filteredData;
    }
    else {
        return listToSort;
    }

};
