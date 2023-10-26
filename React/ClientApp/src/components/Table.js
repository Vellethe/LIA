import React, { Component, useState } from "react";
import "./Table.css";
import { TableEntry } from "./TableEntry"

var dataArray = [
    { id: 1, name: "batman", role: "Hero", contactName: "Bruce Wane", date: "2023-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
    { id: 2, name: "joker", role: "Vilan", contactName: " The rideler", date: "2023-10-26", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
    { id: 3, name: "the rideler", role: "vilan", contactName: "Bruce Wane", date: "2022-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
]


export const Table = () => {
    const [data, setData] = useState(dataArray);
    const sortDate = (useDecendingOrder) => {
        var curentData = data;
        var newData = curentData.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        setData([...newData]);
        console.log(newData);
    }
    return (<div>

        <table>
            <button onClick={() => sortDate(true)}>flase</button>
            <thead>
                <tr>
                    <th className="name">Name</th>
                    <th className="text">Role</th>
                    <th className="text">Contact name</th>
                    <th className="text">Date</th>
                    <th className="text">Location</th>
                    <th className="text">Tags</th>
                    <th className="text">Favorites</th>
                </tr>
            </thead>
            <tbody>
                {data.map(job =>
                    <TableEntry key={job.id} job={job} />
                )}
            </tbody>
        </table>
    </div>)
}

