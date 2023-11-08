import React, { useEffect } from 'react';
import styles from './Description.module.css';

export const DescriptionPage = ({ job, favorite, updateFavoriteFunc, backButtonFunc }) => {

    const parseTags = (input) => {
        return;
        var output = "";
        for (let i = 0; i < input.length; i++) {
            output += input[i];
            if (i < input.length - 1) {
                output += ", "
            }
        }
        return output;
    }
    useEffect(() => {
        window.scrollTo({ left: 0, top: 0, behavior: "instant" });
    })

    const handleFavoriteChange = () => {
        const updatedFavorite = !favorite;
        updateFavoriteFunc(updatedFavorite);
    }
    if (job != null) {

        return (
            <div className={styles['container']}>
                <div>
                    <button id={styles.backButton} onClick={backButtonFunc}>Back button</button>
                </div>
                <div className={styles['body']}>
                        <div key={job.id}>
                            <div className={styles.grid}>
                                <div className={styles.row}>
                                    <p className={styles.label}>Name:</p>
                                    <p className={styles.value}>{job.company.name}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.label2}>Tags:</p>
                                    <p className={styles.value2}>{parseTags(job.tags)}</p>
                                </div>

                            </div>

                            <div className={styles.grid}>
                                <div className={styles.row}>
                                    <p className={styles.label}>Date:</p>
                                    <p className={styles.value}>{job.postDate}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.label2}>Role:</p>
                                    <p className={styles.value2}>{job.role}</p>
                                </div>
                            </div>

                            <div className={styles.grid}>
                                <div className={styles.row}>
                                    <p className={styles.label}>Location:</p>
                                    <p className={styles.value}>{job.municipality}</p>
                                </div>
                                <div className={styles.row}>
                                    <p className={styles.label2}>Contacts:</p>
                                    <p className={styles.value2}>{job.contactName}</p>
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
                            type="checkbox"
                            checked={favorite}
                            onChange={updateFavoriteFunc}
                        />
                        Favorite: {favorite ? 'Yes' : 'No'}
                    </label>
                    <p>Tasty Cookies</p>
                    <p>Tasty Cookies</p>
                    <p>Tasty Cookies</p>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
};