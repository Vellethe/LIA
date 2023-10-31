import React from "react";
import "./TableEntry.css"
//import "./style.css";

export function TableEntry({ job }) {

    return (
        <table>
            <tr className="row1">
                <td className="text">{job.name}</td>
            </tr>
            <tr className="row2">
                <td className="text">{job.location}</td>
                <td className="text"><input type="checkbox"></input></td>
                <td className="text"><input type="checkbox"></input></td>
                <td className="text">{job.date}</td>
            </tr>
        </table>

    );
}



