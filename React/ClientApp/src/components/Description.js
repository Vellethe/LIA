import React from 'react';
import { dataArray } from './JobData'
import styles from './Description.module.css';

export const DescriptionPage = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <div className={styles['headerCell']}>{}Company</div>
                <div className={styles['headerCell']}>{}Favorites</div>
                <div className={styles['headerCell']}>{}Excluded</div>
                <div className={styles['headerCell']}>Date</div>
            </div>
            <div className={styles['body']}>
                {dataArray.map(job => (
                    <div className={styles.grid} key={job.id}>
                        <div className={styles.row1}>
                            <div className={styles.textName}>{job.name}</div>
                        </div>
                        <div className={styles.row2}>
                            <div className={styles.textLocation}>{job.location}</div>
                            <div className={styles.box}><input type="checkbox" /></div>
                            <div className={styles.box}><input type="checkbox" /></div>
                            <div className={styles.textDate}>{job.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}