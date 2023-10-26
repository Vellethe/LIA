import React, { Component } from "react";
import "./Table.css";
import { TableEntry } from "./TableEntry"

export class Table extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id:1,name: "batman", role: "Hero", contactName: "Bruce Wane", date: "2023-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
                { id:2,name: "joker", role: "Vilan", contactName: " The rideler", date: "2023-10-26", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
                { id:3,name: "the rideler", role: "vilan", contactName: "Bruce Wane", date: "2022-10-25", location: "Gotham City", tags: ["crime", "hero", "stuff"], favorit: true },
            ]
        };
        this.sortDate = this.sortDate.bind(this);
    }

    sortDate(useDecendingOrder) {
        var curentData = this.state.data;
        var newData = curentData.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        this.setState({ data: newData })
    }

    render() {
        return (<div>

            <table>
                <button onClick={() => this.sortDate(true)}>flase</button>
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
                    {this.state.data.map(job =>
                        <TableEntry key={job.id} job={job} />
                    )}
                </tbody>
            </table>
        </div>)
    }
}

