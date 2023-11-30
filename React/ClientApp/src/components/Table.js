import redXSymbol from "./../images/Red_X.png"
import styles from "./Table.module.css"
import { formatDate } from "./../Helpers/formating"
export function Table({ data, checkBoxFunc, updateExluded, selectForShowFunc,saveScroll}) {

    return (
        <div>
            <div className={styles.body} >
                {data.map(job => (
                    <div className={styles.gridHome} key={job.id}onClick={() => selectForShowFunc(job)} >

                        <div className={styles.jobTitle} > {job.role}</div>

                        <div className={styles.desciptionGrid}>
                            <div className={styles.textName}>{job.company.name}</div>
                            <button className={`${styles.box} ${styles.exclude}`} onClick={(e) => {  saveScroll(); updateExluded(job.company.id, true); e.stopPropagation();}}><img src={redXSymbol} alt="X" /></button>
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