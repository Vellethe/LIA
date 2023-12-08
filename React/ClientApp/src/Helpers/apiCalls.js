var baseUrl = "http://localhost:5000";

export async function getData() {
    var url = baseUrl+"/api/jobs?page=0";
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}

export async function getTags() {
    var url = baseUrl+"/api/tags";
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}

export async function updateFavorite(id, state,userId) {
    var url = baseUrl+`/api/favorite?id=${id}&isFavorite=${state}&userID=${userId}`;
    console.log(id, state);
    var response = await fetch(url, {
        method: "PUT",
    })
}

export async function updateExluded(id, state) {
    var url = baseUrl+`/api/excluded?id=${id}&isExcluded=${state}`;
    var response = await fetch(url, {
        method: "PUT",
    })
}

export async function getExclueded() {
    var url = baseUrl+"/api/companies?onlyExcluded=true";
    var response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
}

export async function postTag(name) {
    var url = baseUrl+"/api/tags?name=" + encodeURIComponent(name);
    var response = await fetch(url, {
        method: "POST",
    })
}

export async function getUsers() {
    var url = baseUrl+"/api/users";
    var response = await fetch(url, {
        method: "GET",
    })
    var data = await response.json();
    return data;
}
