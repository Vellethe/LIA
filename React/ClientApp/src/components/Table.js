import { useEffect, useState } from "react";
import x from "./../images/Red_X.png"
import styles from "./Table.module.css"

export function Table({ data, checkBoxFunc, updateExluded, selectForShowFunc, loadScroll,saveScroll}) {
    const [updateTrigger, setUppdateTrigger] = useState({});
    const formatDate = (input) => {
        var date = new Date(input);
        var output = `
        ${date.getFullYear()}-
        ${("0" + (date.getMonth()+1)).slice(-2)}-
        ${("0" + date.getDate()).slice(-2)}`;
        return output;
    }

    useEffect(() => {
        loadScroll();
    }, [data])



    return (
        <div>
            <div className={styles.body} >
                {data.map(job => (
                    <div className={styles.gridHome} key={job.id}onClick={() => selectForShowFunc(job)} >

                        <div className={styles.jobTitle} > {job.role}</div>

                        <div className={styles.desciptionGrid}>
                            <div className={styles.textName}>{job.company.name}</div>
                            <button className={`${styles.box} ${styles.exclude}`} onClick={(e) => { e.stopPropagation(); saveScroll(); updateExluded(job.company.id, true); }}><img src={x} alt="X" /></button>
                            <div className={styles.textLocation}>{job.municipality}</div>
                        </div>
                        <div onClick={e => e.stopPropagation()} className={`${styles.box} ${styles.star}`}>
                            <input id={job.id} onChange={checkBoxFunc} type="checkbox" defaultChecked={job.favorite}  />
                            <label htmlFor={job.id }>Favorite</label>
                        </div>
                        <div className={styles.textDate}>{formatDate(job.postDate)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}