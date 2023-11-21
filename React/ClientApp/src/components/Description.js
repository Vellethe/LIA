import React, { useEffect, useState } from 'react';
import styles from './Description.module.css';
import {getEmailAddress, getContacts} from './../Helpers/apiCalls'
import { formatDate, parseTags } from "./../Helpers/formating"

export const DescriptionPage = ({ job, backButtonFunc, favorite, updateFavoriteFunc, /*jobId*/ }) => {

    const [contacts, setContacts] = useState();
    useEffect(() => {
        window.scrollTo({ left: 0, top: 0, behavior: "instant" });
    });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const fetchedContacts = await getContacts();
                setContacts(fetchedContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

        //const [email, setEmail] = useState(null);

        //useEffect(() => {
        //    const fetchEmail = async () => {
        //        try {
        //            const fetchedEmail = await getEmailAddress(jobId);
        //            setEmail(fetchedEmail);
        //        } catch (error) {
        //            // Handle errors if necessary
        //            console.error('Error fetching email:', error);
        //        }
        //    };

        //    fetchEmail();
        //}, [jobId]);


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
                        <div className={styles.row}>
                            <p className={styles.label}>Location:</p>
                            <p className={styles.value}>{job.municipality}</p>
                        </div>
                        <div className={styles.row}>
                                <p className={styles.label2}>Contacts:</p>
                                <ul className={styles.value2}>
                                    {contacts.map(contact => (
                                        <li key={contact.id}>
                                            <p>Name: {contact.name}</p>
                                            <p>Email: {contact.email}</p>
                                            <p>Phone Number: {contact.phonenumber}</p>
                                        </li>
                                    ))}
                                </ul>
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
                        defaultChecked={job.favorite}
                        onChange={updateFavoriteFunc}
                        id={job.id}
                    />
                    Favorite: {favorite ? 'Yes' : 'No'}
                </label>
                <a href={job.url} className={styles.webUrl} target="_blank" rel="noopener noreferrer">
                    {`Link to ${job.provider}`}
                </a>
                {/*{email && (*/}
                {/*    <div className={styles.emailAddress}>*/}
                {/*        <p className={styles.label}>Email Address:</p>*/}
                {/*        <p className={styles.value}>{email}</p>*/}
                {/*    </div>*/}
                {/*)};*/}
            </div>
        </div>
    );
}
    else {
    return null;
}
};


