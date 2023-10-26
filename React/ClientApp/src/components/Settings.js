import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./SettingsPage.css";
import data from "./testingtags.json";

export const SettingsPage = () => {

    const [tags, setTags] = useState(data);
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

        const newTags = [...tags, newTag];
        setTags(newTags);

        setAddFormData({ tags: "" });
    }

    const handleDeleteClick = (tagsId) => {
        const newTags = [...tags];

        const index = tags.findIndex((tag) => tag.id === tagsId)

        newTags.splice(index, 1);

        setTags(newTags);
    }
    return (
        <div>
            <div id="SettingsSearchForm">
                <div id="AddTagAndButton">
                    <form onSubmit={handleAddFormSubmit}>
                        <input
                            id="SettingsAddTags"
                            type="text"
                            name="tags"
                            placeholder="Enter a new tag"
                            value={addFormData.tags}
                            onChange={handleAddFormChange}
                        />
                        <button id="AddSettings" type="submit">Add</button>
                    </form>
                </div>
                <form>
                    <input
                        id="SettingsFreeSearch"
                        type="text"
                        name="searchTags"
                        placeholder="Free search" />
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="text">{/*Sökord*/}Tags</th>
                        <th className="deleteButton"></th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => (
                        <tr key={index}>
                            <td>{tag.tags}</td>
                            <td>
                                <button type="button" id="SettingsDeleteButton"
                                    onClick={() => handleDeleteClick(tag.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};