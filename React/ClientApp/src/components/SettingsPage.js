import React, { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./SettingsPage.module.css";
import commonStylesTable from "./CommonTable.module.css"
import data from "./testingtags.json";

export const SettingsPage = () => {
    const allTags = data;
    const [showTags, setShowTags] = useState(allTags);
    const [addFormData, setAddFormData] = useState({
        tags: ""
    })

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
        setShowTags(newTags);

        setAddFormData({ tags: "" });
    }

    const handleDeleteClick = (tagsId) => {
        const newTags = [...showTags];

        const index = showTags.findIndex((tag) => tag.id === tagsId)

        newTags.splice(index, 1);

        setShowTags(newTags);
    }

    const searchChange = (event) => {
        var searchWord = event.target.value;
        var newTaglist = allTags.filter((tag) => tag.tags.toLowerCase().includes(searchWord.toLowerCase()))
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
                <tbody>
                    {showTags.map((tag, index) => (
                        <tr key={index}>
                            <td>{tag.tags}</td>
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