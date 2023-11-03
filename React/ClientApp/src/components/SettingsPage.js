import React, { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import styles from "./SettingsPage.module.css";
import commonStylesTable from "./CommonTable.module.css"

export const SettingsPage = () => {
    let allData = useRef([]);
    const [reloadTrigger,setReloadTrigger] = useState({});
    const [showTags, setShowTags] = useState([]);
    const [addFormData, setAddFormData] = useState({
        tags: ""
    })

    async function getTags(){
        var url = "https://localhost:7273/api/tags"; 
        var response = await fetch(url, {
            method: "GET",
        })
        const data = await response.json()
        return data
    }

    async function postTag(name) {
        var url = "https://localhost:7273/api/tags?name="+name; 
        var response = await fetch(url, {
            method: "POST",
        })
        setReloadTrigger({});
    }

    useEffect(() => {
        getTags().then(x => {
            setShowTags(x);
            allData.current = x;
        }
        )
    }, [reloadTrigger]);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldTags = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldTags] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newTag = {
            id: nanoid(),
            tags: addFormData.tags
        }

        const newTags = [...showTags, newTag];
        postTag(addFormData.tags);
        //setShowTags(newTags);

        setAddFormData({ tags: "" });
    }

    const handleDeleteClick = (tagsId) => {
        //TODO implement delete
    }

    const searchChange = (event) => {
        var searchWord = event.target.value;
        var newTaglist = allData.current.filter((tag) => tag.name.toLowerCase().includes(searchWord.toLowerCase()))
        setShowTags(newTaglist);
    }


    return (
        <div>
            <div id={styles.SettingsSearchForm}>
                <div id={styles.AddTagAndButton}>
                    <form onSubmit={handleAddFormSubmit}>
                        <input
                            id={styles.SettingsAddTags}
                            type="text"
                            name="tags"
                            placeholder="Enter a new tag"
                            value={addFormData.tags}
                            onChange={handleAddFormChange}
                        />
                        <button id={styles.AddSettings} type="submit">Add</button>
                    </form>
                </div>
                <form>
                    <input
                        id={styles.SettingsFreeSearch}
                        type="text"
                        name="searchTags"
                        placeholder="Free search"
                        onChange={searchChange}
                    />
                </form>
            </div>
            <table className={commonStylesTable.table}>
                <thead className={commonStylesTable.thead}>
                    <tr>
                        <th className={styles.text}>{/*Sökord*/}Tags</th>
                        <th className={styles.deleteButton}></th>
                    </tr>
                </thead>
                <tbody className={commonStylesTable.tbody}>
                    {showTags.map((tag) => (
                        <tr key={tag.id}>
                            <td>{tag.name}</td>
                            <td>
                                <button
                                    type="button"
                                    id={styles.SettingsDeleteButton}
                                    onClick={() => handleDeleteClick(tag.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};