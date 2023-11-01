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
                {dataArray.map(job => (
                    <div className={styles.grid} key={job.id}>
                        <div className={styles.row}>
                            <div className={styles.label}>Name</div>
                            <div className={styles.value}>{job.name}</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.label}>Location</div>
                            <div className={styles.value}>{job.location}</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.label}>Date</div>
                            <div className={styles.value}>{job.date}</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.label}>Role</div>
                            <div className={styles.value}>{job.role}</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.label}>Tags</div>
                            <div className={styles.value}>{parseTags(job.tags)}</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.label}>Contacts</div>
                            <div className={styles.value}>{job.contactName}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};