import { useEffect } from "react";
import x from "./../images/Red_X.png"
import styles from "./Table.module.css"

export function Table({ data, checkBoxFunc, updateExluded, selectForShowFunc, setScroll}) {
    
    const formatDate = (input) => {
        var date = new Date(input);
        var output = `
        ${date.getFullYear()}-
        ${("0" + (date.getMonth()+1)).slice(-2)}-
        ${("0" + date.getDate()).slice(-2)}`;
        return output;
    }

    useEffect(() => {
        setScroll();
    }, [])



    return (
        <div>
            <div className={styles.body} >
                {data.map(job => (
                    <div className={styles.gridHome} key={job.id}>

                        <div className={styles.jobTitle} onClick={() => selectForShowFunc(job)}> {job.role}</div>

                        <div className={styles.desciptionGrid}>
                            <div className={styles.textName}>{job.company.name}</div>
                            <button className={`${styles.box} ${styles.exclude}`} onClick={() => updateExluded(job.company.id,true)}><img src={x} alt="X" /></button>
                            <div className={styles.textLocation}>{job.municipality}</div>
                        </div>
                        <div className={`${styles.box} ${styles.star}`}>
                            <input id={job.id} onChange={checkBoxFunc} type="checkbox" defaultChecked={job.favorite} />
                            <label htmlFor="favorite">Favorite</label>
                        </div>
                        <div className={styles.textDate}>{formatDate(job.postDate)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}