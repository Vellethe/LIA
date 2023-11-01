import React from 'react';
import { dataArray } from './JobData'
import styles from './Description.module.css';

export const DescriptionPage = () => {

    const parseTags = (input) => {
        var output = "";
        for (let i = 0; i < input.length; i++) {
            output += input[i];
            if (i < input.length - 1) {
                output += ", "
            }
        }
        return output;
    }
    return (
        <div className={styles['container']}>
            <div className={styles['body']}>
                {dataArray.slice(0, 1).map(job => (
                    <div key={job.id}>
                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <div className={styles.label}>Name:</div>
                                <div className={styles.value}>{job.name}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Location:</div>
                                <div className={styles.value}>{job.location}</div>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <div className={styles.label}>Date:</div>
                                <div className={styles.value}>{job.date}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Role:</div>
                                <div className={styles.value}>{job.role}</div>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <div className={styles.label}>Tags:</div>
                                <div className={styles.value}>{parseTags(job.tags)}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label}>Contacts:</div>
                                <div className={styles.value}>{job.contactName}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};