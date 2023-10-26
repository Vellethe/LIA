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
                    placeholder="Free search"/>
                </form>
        </div>
        <table>
            <thead>
                <tr>
                     <th className="text">Tags</th>
                     <th className="deleteButton"></th>
                </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => (
                        <tr key={index}>
                            <td>{tag.tags}</td>
                            <td>
                                <button type="button" id="SettingsDeleteButton"
                                    onClick={()=> handleDeleteClick(tag.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export const SettingsPage2 = () => {
    return (
        <div className="settings-page">
            <div className="div-2">
                <div className="table">
                    <div className="overlap">
                        <div className="card-container" />
                        <div className="card-container-2" />
                        <div className="frame">
                            <div className="overlap-wrapper">
                                <div className="overlap-2">
                                    <div className="overlap-group-wrapper">
                                        <div className="overlap-group-2">
                                            <div className="text-wrapper-4">C++</div>
                                        </div>
                                    </div>
                                    <img className="img" alt="Image" src="image-37.png" />
                                </div>
                            </div>
                            <div className="frame-2">
                                <div className="overlap-3">
                                    <div className="overlap-group-wrapper">
                                        <div className="div-3">
                                            <div className="text-wrapper-5">Developer</div>
                                        </div>
                                    </div>
                                    <img className="image-2" alt="Image" src="image.png" />
                                </div>
                            </div>
                            <div className="frame-3">
                                <div className="overlap-2">
                                    <div className="overlap-group-wrapper">
                                        <div className="overlap-group-2">
                                            <div className="text-wrapper-6">C#</div>
                                        </div>
                                    </div>
                                    <img className="img" alt="Image" src="image-37-2.png" />
                                </div>
                            </div>
                            <div className="frame-4">
                                <div className="overlap-4">
                                    <div className="card-container-wrapper">
                                        <div className="div-3" />
                                    </div>
                                    <div className="text-wrapper-7">Java</div>
                                    <img className="image-3" alt="Image" src="image-37-3.png" />
                                </div>
                            </div>
                            <div className="overlap-5">
                                <div className="frame-5">
                                    <div className="overlap-6">
                                        <div className="frame-6">
                                            <div className="div-3" />
                                        </div>
                                        <div className="text-wrapper-7">Backend</div>
                                        <img className="image-4" alt="Image" src="image-37-5.png" />
                                    </div>
                                </div>
                                <div className="frame-7">
                                    <div className="overlap-2">
                                        <div className="overlap-group-wrapper">
                                            <div className="overlap-group-2">
                                                <div className="text-wrapper-8">Python</div>
                                            </div>
                                        </div>
                                        <img className="img" alt="Image" src="image-37-4.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="frame-8">
                                <div className="overlap-7">
                                    <div className="overlap-group-wrapper">
                                        <div className="overlap-group-2">
                                            <div className="text-wrapper-8">Frontend</div>
                                        </div>
                                    </div>
                                    <img className="image-5" alt="Image" src="image-37-6.png" />
                                </div>
                            </div>
                        </div>
                        <div className="group-wrapper">
                            <div className="group-2">
                                <div className="text-wrapper-9">Free text search</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group-3">
                    <div className="overlap-8">
                        <div className="text-wrapper-10">New search word</div>
                    </div>
                </div>
                <button className="button-primary">
                    <button className="button-content">
                        <div className="label">ADD</div>
                    </button>
                </button>
                <div className="search-bar">
                    <div className="overlap-9">
                        <div className="text-wrapper-11">Text search</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
