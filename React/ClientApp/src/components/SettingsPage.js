import React, { useEffect, useState } from "react";
import styles from "./SettingsPage.module.css";
import commonStylesTable from "./CommonTable.module.css"
import { getTags, postTag } from "./../Helpers/apiCalls"
import { caseInsensitiveContains } from "./../Helpers/sorting"

export const SettingsPage = () => {
    const [reloadTrigger,setReloadTrigger] = useState({});
    const [tags, setTags] = useState([]);
    const [addFormData, setAddFormData] = useState({
        tags: ""
    })
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        getTags().then(x => {
            setTags(x);
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

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();

        const inputTag = addFormData.tags.trim(); 
        const formattedTag = inputTag.charAt(0).toUpperCase() + inputTag.slice(1).toLowerCase();

        await postTag(formattedTag);
        setReloadTrigger({});
        setAddFormData({ tags: "" });
    }

    const handleDeleteClick = (tagsId) => {
        // Send a DELETE request to the server to delete the tag by its ID
        const url = `https://localhost:7273/api/tags?tagId=${tagsId}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 204)
                {
                    setReloadTrigger({});
                } else
                {
                    <p>This delete did not work</p>
                }
            })
            .catch((error) => {
                console.error("Error deleting tag:", error);
            });
    }

    const searchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    function tagsToShow() {
        return tags.filter(x => caseInsensitiveContains(x.name, searchTerm));
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
                        <th className={styles.text}>Tags</th>
                        <th className={styles.deleteButton}></th>
                    </tr>
                </thead>
                <tbody className={commonStylesTable.tbody}>
                    {tagsToShow().map((tag) => (
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