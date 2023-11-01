import React, { useState } from 'react';
import styles from './DropDown.module.css';

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleDropdownTick = (name) => {
        if (selectedTags.includes(name)) {
            var newTable = selectedTags.filter((word) => word !== name);
            setSelectedTags([...newTable])
        }
        else {
            setSelectedTags([...selectedTags, name])
        }
    }

    var tags = ["Developer", "Software", "Fullstack", "Embedded", "Backend", "Frontend", "Tester", "python", "C#"]

    return (
        <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles['dropdown-button']}>Skills</button>
            {isOpen && (
                <div className={styles.scrollMenu} onMouseLeave={() => setIsOpen(false)}>
                    <ul className={styles['dropdown-list']}>
                        {tags.map(tag => (
                            <li key={tag}>
                                <label htmlFor={tag}>{tag}</label>
                                <input defaultChecked={selectedTags.includes(tag)} onChange={() => handleDropdownTick(tag)} type="checkbox" id={tag} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
