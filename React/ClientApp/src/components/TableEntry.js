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



