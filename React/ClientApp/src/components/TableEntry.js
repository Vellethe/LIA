import PropTypes from "prop-types";
import React from "react";
//import "./style.css";

export function TableEntry({job}){
    return (
        <tr className="row2">
            <td className="text">{ job.name}</td>
            <td className="text">{job.role}</td>
            <td className="text">{job.contactName}</td>
            <td className="text">{job.date}</td>
            <td className="text">{job.location}</td>
            <td className="text">{job.tags}</td>
            <td className="text"><input type="checkbox"></input></td>
        </tr>
    )
}



