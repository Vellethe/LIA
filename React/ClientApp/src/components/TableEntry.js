import PropTypes from "prop-types";
import React from "react";
import "./TableEntry.css"
//import "./style.css";

export function TableEntry({ job }) {

    const parseTags = (input) => {
        var output = "";
        for (let i = 0; i < input.length; i++) {
            output += input[i];
            if (i < input.length-1) {
                output += ", "
            }
        }
        return output;
    }


    return (
        <tr className="row2">
            <td className="text">
                <div className="job-name">{job.name}</div>
                <div className="job-details">
                    <span className="job-location">{job.location}</span>
                    <span className="job-checkboxes">
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                    </span>
                    <span className="job-date">{job.date}</span>
                </div>
            </td>
        </tr>


    )
}



