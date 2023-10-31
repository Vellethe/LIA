import React, { useState } from 'react';
import './DropDown.css';

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
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">Skills</button>
            {isOpen && (
                <div className="scrollMenu" onMouseLeave={() => setIsOpen(false)}>
                    <ul className="dropdown-list">
                        {tags.map(tag => (
                            <li key={tag}>
                                <label htmlFor={tag}>{tag}</label>
                                <input defaultChecked={selectedTags.includes( tag )} onChange={() => handleDropdownTick( tag )} type="checkbox" id={tag} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
