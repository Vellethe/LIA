import React, { Component, useState } from "react";
import "./Table.css";
import { TableEntry } from "./TableEntry"

var dataArray = [
    { id: 1, name: "batman", role: "Hero", contactName: "Bruce Wane", date: "2023-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
    { id: 2, name: "joker", role: "Vilan", contactName: " The rideler", date: "2023-10-26", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
    { id: 3, name: "the rideler", role: "vilan", contactName: "Bruce Wane", date: "2022-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
]


export const Table = () => {
    const [jobData, setJobData] = useState(dataArray);
    const [isAscending, setAscending] = useState(true);
    const [sortColumn, setSortColumn] = useState("date");

    const sortDate = (useAscendingOrder) => {
        setSortColumn("date")
        setAscending(!isAscending);
        const newData = [...jobData];
        newData.sort((a, b) => {
            if (isAscending) {
                return new Date(a.date) - new Date(b.date);
            }
            else {
                return new Date(b.date) - new Date(a.date);
            }
        });
        setJobData(newData);
    }
    const sortName = () => {
        setSortColumn("date")
        setAscending(!isAscending);
        const newData = [...jobData];
        newData.sort((a, b) => {
            if (isAscending) {
                return a.date.localeCompare(b.date, undefined, { sensitivity: "base" });
            }
            else {
                return b.date.localeCompare(a.date, undefined, { sensitivity: "base" });
            }
        });
        setJobData(newData);
    }
    return (<div>

        <button onClick={() => sortDate(isAscending)}>false</button>
        <table>
            <thead>
                <tr>
                    <th className="text">Company</th>
                    <th></th>
                    <th className="text">Favorites</th>
                    <th className="text">Excluded</th>
                    <th onClick={() => sortName(isAscending)} className={"name " + (sortColumn === "name" ? (isAscending ? "ascending" : "descending") : "")}>Date</th>
                </tr>
            </thead>
            <tbody>
                {jobData.map(job =>
                    <TableEntry key={job.id} job={job} />
                )}
            </tbody>
        </table>
    </div>)
}
//export const Table = () => {
//    const [jobData, setJobData] = useState(dataArray);
//    const [isAscending, setAscending] = useState(true);
//    const [sortColumn, setSortColumn] = useState("date");

//    const sortDate = (useAscendingOrder) => {
//        setSortColumn("date")
//        setAscending(!isAscending);
//        var curentData = jobData;
//        var newData = curentData.sort(function (a, b) {
//            if (useAscendingOrder) {
//                var x = a;
//                a = b;
//                b = x;
//            }
//            return new Date(b.date) - new Date(a.date);
//        });
//        setJobData([...newData]);
//    }
//    const sortName = (useAscendingOrder) => {
//        setSortColumn("name")
//        setAscending(!isAscending);
//        var newData = jobData.sort(function (a, b) {
//            return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
//        })
//        if (useAscendingOrder) {
//            newData.reverse()
//        }
//        setJobData([...newData]);
//    }
//    return (<div>

//        <button onClick={() => sortDate(isAscending)}>false</button>
//        <table>
//            <thead>
//                <tr>
//                    <th onClick={() => sortName(isAscending)} className={"name " + (sortColumn === "name" ? (isAscending ? "ascending" : "descending") : "")}>Company</th>
//                    <th></th>
//                    <th className="text">Favorites</th>
//                    <th className="text">Excluded</th>
//                    <th className="text">Date</th>
//                </tr>
//            </thead>
//            <tbody>
//                {jobData.map(job =>
//                    <TableEntry key={job.id} job={job} />
//                )}
//            </tbody>
//        </table>
//    </div>)
//}


