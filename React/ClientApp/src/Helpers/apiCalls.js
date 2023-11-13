﻿
export async function getData() {
    var url = "https://localhost:7273/api/jobs?page=0";
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}


export async function getTags() {
    var url = "https://localhost:7273/api/tags";
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}


export async function updateFavorite(id, state) {

    var url = `https://localhost:7273/api/favorite?id=${id}&isFavorite=${state}`;
    console.log(id, state);
    var response = await fetch(url, {
        method: "PUT",
    })
}


export async function updateExluded(id, state) {

    var url = `https://localhost:7273/api/excluded?id=${id}&isExcluded=${state}`;
    console.log(id, state);
    var response = await fetch(url, {
        method: "PUT",
    })
}


export async function getExclueded() {
    var url = "https://localhost:7273/api/companies?onlyExcluded=true";
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}

export async function postTag(name) {
    var url = "https://localhost:7273/api/tags?name=" + encodeURIComponent(name);
    var response = await fetch(url, {
        method: "POST",
    })
}
