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

    //var tags = ["Developer", "Software", "Fullstack", "Embedded", "Backend", "Frontend", "Tester", "python", "C#"]

    return (
        <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles['dropdown-button']}>Skills</button>
            {isOpen && (
                <div className={styles.scrollMenu} onMouseLeave={() => setIsOpen(false)}>
                    <ul className={styles['dropdown-list']}>
                        {tags.map(tag => (
                            <li key={tag.name}>
                                <label htmlFor={tag.name}>{tag.name}</label>
                                <input defaultChecked={selectedTags.includes(tag.name)} onChange={() => handleDropdownTick(tag.name)} type="checkbox" id={tag.name} name="selectedTags" value={tag.name} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
