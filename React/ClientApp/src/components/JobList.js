import redXSymbol from "./../images/Red_X.png"
import styles from "./JobList.module.css"
import { formatDate } from "./../Helpers/formating"
export function JobList({ data, checkBoxFunc, updateExluded, selectForShowFunc,saveScroll,userId}) {
    function selectJob(job) {
        var selection = window.getSelection();
        if (selection.type !== "Range") {
            selectForShowFunc(job);
        }
    }
    return (
        <div>
            <div className={styles.body} >
                {data.map(job => (
                    <div className={styles.gridHome} key={job.id} onSelect={(e) => e.stopImmediatePropagation()} onClick={() => selectJob(job)} >

                        <div className={styles.jobTitle} > {job.role}</div>

                        <div className={styles.desciptionGrid}>
                            <div className={styles.textName}>{job.company.name}</div>
                            <button className={`${styles.box} ${styles.exclude}`} onClick={(e) => { saveScroll(); updateExluded(job.company.id, true); e.stopPropagation(); }}><img src={redXSymbol} alt="X" /></button>
                            <div className={styles.textLocation}>{job.municipality}</div>
                        </div>
                        <div onClick={e => e.stopPropagation()} className={`${styles.box} ${styles.star}`}>
                            {JSON.stringify(job.favorites)}
                            <input id={job.id} onChange={checkBoxFunc} type="checkbox" defaultChecked={job.favorites.find((x) => x.id = userId)} />
                            <label htmlFor={job.id}>Favorite</label>
                        </div>
                        <div className={styles.textDate}>{formatDate(job.postDate)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}