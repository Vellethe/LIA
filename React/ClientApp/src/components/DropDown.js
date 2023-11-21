import React, { useState } from 'react';
import styles from './DropDown.module.css';

function Dropdown({ tags, submitForm }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleDropdownTick = (name) => {
        var output = [];
        if (selectedTags.includes(name)) {
            var newTable = selectedTags.filter((word) => word !== name);
            output = [...newTable];
        }
        else {
            output = [...selectedTags, name]
        }
        setSelectedTags(output);
        submitForm();
    }

    return (
        <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles['dropdown-button']}>Skills</button>
            <div className={styles.scrollMenu} style={isOpen ? {} : { display: 'none' }} onMouseLeave={() => setIsOpen(false)}>
                    <ul className={styles['dropdown-list']}>
                        {tags.map(tag => (
                            <li key={tag.name}>
                                <label htmlFor={tag.name}>{tag.name}</label>
                                <input defaultChecked={selectedTags.includes(tag.name)} onChange={() => handleDropdownTick(tag.name)} type="checkbox" id={tag.name} name="selectedTags" value={tag.name} />
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    );
}

export default Dropdown;
