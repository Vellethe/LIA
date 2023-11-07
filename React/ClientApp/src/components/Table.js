import x from "./../images/Red_X.png"
import styles from "./Table.module.css"

export function Table({ data, checkBoxFunc}) {
    
    const formatDate = (input) => {
        var date = new Date(input);
        var output = `
        ${date.getFullYear()}-
        ${("0" + (date.getMonth()+1)).slice(-2)}-
        ${("0" + date.getDate()).slice(-2)}`;
        return output;
    }
    async function addExclued(companyId) {
        var url = `https://localhost:7273/api/excluded?id=${companyId}&isExcluded=true`;
        var response = await fetch(url, {
            method: "Patch",
        })
    }


    async function updateExluded(id, state) {

        var url = `https://localhost:7273/api/excluded?id=${id}&isExcluded=${state}`;
        console.log(id, state);
        var response = await fetch(url, {
            method: "PUT",
        })
    }

    return (
        <div>
            <div className={styles.body} >
                {data.map(job => (
                    <div className={styles.gridHome} key={job.id}>
                        <div className={styles.jobTitle}> {job.role}</div>
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