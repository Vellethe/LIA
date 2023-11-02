import x from "./../images/Red_X.png"
import styles from "./Table.module.css"

export function Table({ data }) {
    
    const formatDate = (input) => {
        var date = new Date(input);
        var output = `
        ${date.getFullYear()}-
        ${("0" + (date.getMonth()+1)).slice(-2)}-
        ${("0" + date.getDate()).slice(-2)}`;
        return output;
    }

    return (
        <div>
                <div className={styles.body} >
                    {data.map(job => (
                        <div className={styles.gridHome} key={job.id}>
                            <div className={styles.jobTitle}> {job.role}</div>
                            <div className={styles.desciptionGrid}>
                                <div className={styles.textName}>{job.company.name}</div>
                                <button className={`${styles.box} ${styles.exclude}`} onClick={() => console.log("tignsnagn")}><img src={x} alt="X" /></button>
                                <div className={styles.textLocation}>{job.municipality}</div>
                            </div>
                            <div className={`${styles.box} ${styles.star}`}>
                                <input type="checkbox" />
                                <p>Favorite</p>
                            </div>
                            <div className={styles.textDate}>{formatDate(job.postDate)}</div>
                        </div>
                    ))}
                </div>
        </div>
    );
}