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
                                <div className={styles.label2}>Location:</div>
                                <div className={styles.value2}>{job.location}</div>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <div className={styles.label}>Date:</div>
                                <div className={styles.value}>{job.date}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label2}>Role:</div>
                                <div className={styles.value2}>{job.role}</div>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <div className={styles.label}>Tags:</div>
                                <div className={styles.value}>{parseTags(job.tags)}</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.label2}>Contacts:</div>
                                <div className={styles.value2}>{job.contactName}</div>
                            </div>
                        </div>
                        <div className={styles.grid2}>
                            <div className={styles.row}>
                                <div className={styles.labelDesc}>Description</div>
                                <div className={styles.desc}>{job.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles['body2']}>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
                <p>Tasty Cookies</p>
            </div>
        </div>
    );
};