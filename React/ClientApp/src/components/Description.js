import React from 'react';
import { dataArray } from './JobData'

export const DescriptionPage = () => {
    return (
        <div className="grid-container">
            <div className="grid-header">
                <div className="grid-header-cell text">Company</div>
                <div className="grid-header-cell text">Favorites</div>
                <div className="grid-header-cell text">Excluded</div>
                <div className="grid-header-cell name">Date</div>
            </div>
            <div className="grid-body">
                {dataArray.map(job => (
                    <div className="grid" key={job.id}>
                        <div className="row1">
                            <div className="textName">{job.name}</div>
                        </div>
                        <div className="row2">
                            <div className="textLocation">{job.location}</div>
                            <div className="box"><input type="checkbox" /></div>
                            <div className="box"><input type="checkbox" /></div>
                            <div className="textDate">{job.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}