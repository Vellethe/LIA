import React, { useEffect } from 'react';
import styles from './Description.module.css';
import { formatDate, parseTags } from "./../Helpers/formating"

export const DescriptionPage = ({ job, backButtonFunc, favorite, updateFavoriteFunc, userId }) => {
    useEffect(() => {
        window.scrollTo({ left: 0, top: 0, behavior: "instant" });
    });

    function checkboxState(job) {
        return job.favorites.find((x) => x.user.id === userId);
    }

    if (job != null) {
        return (
            <div className={styles['container']}>
                <div>
                    <button id={styles.backButton} onClick={backButtonFunc}>
                        Back button
                    </button>
                </div>
                <div className={styles['body']}>
                    <div key={job.id}>
                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <p className={styles.label}>Company:</p>
                                <p className={styles.value}>{job.company.name}</p>
                            </div>
                            <div className={styles.row}>
                                <p className={styles.label2}>Tags:</p>
                                <p className={styles.value2}>{parseTags(job.tagJobs)}</p>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.row}>
                                <p className={styles.label}>Role:</p>
                                <p className={styles.value}>{job.role}</p>
                            </div>
                            <div className={styles.row}>
                                <p className={styles.label2}>Date:</p>
                                <p className={styles.value2}>{formatDate(job.postDate)}</p>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.rowSpecial}>
                                <p className={styles.label}>Location:</p>
                                <p className={styles.value}>{job.municipality}</p>
                            </div>
                            <div className={styles.row}>
                                <p className={styles.label2}>Contacts:</p>
                                {(job.contacts && job.contacts.length > 0) ? (
                                    <ul className={styles.value2}>
                                        {job.contacts.map(contact => (

                                            <fieldset className={styles.contact} key={contact.id}>
                                                {contact.isGenerated? <legend title="Generated from description may not be 100% reliable">Generated</legend>:null}
                                                {contact.name !== null ? <p>Name: {contact.name}</p> : null}
                                                {contact.email !== null ? <p>Email: {contact.email}</p> : null}
                                                {contact.phoneNumber !== null ? <p>Phone Number: {contact.phoneNumber}</p> : null}
                                            </fieldset>
                                        ))}
                                    </ul>
                                ) : (
                                        <p className={styles.value2}>No public contacts available, check link how to proceed with application</p>
                                )}
                            </div>

                        </div>

                        <div className={styles.grid2}>
                            <div className={styles.row}>
                                <p className={styles.label}>Description</p>
                                <p className={styles.desc}>{job.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['body2']}>
                    <label>
                        <input
                            className={styles.checkBox}
                            type="checkbox"
                            checked={checkboxState(job)}
                            onChange={updateFavoriteFunc}
                            id={job.id}
                        />
                        Favorite: {checkboxState(job) ? 'Yes' : 'No'}
                    </label>
                    <a href={job.url} className={styles.webUrl} target="_blank" rel="noopener noreferrer">
                        {`Link to ${job.provider}`}
                    </a>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
};


