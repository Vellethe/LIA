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
        <div class="grid">
            <div class="row row1">
                <div class="cell text">{job.name}</div>
            </div>
            <div class="row row2">
                <div class="cell text">{job.location}</div>
                <div class="cell text"><input type="checkbox"></input></div>
                <div class="cell text"><input type="checkbox"></input></div>
                <div class="cell text">{job.date}</div>
            </div>
        </div>
    );
}



