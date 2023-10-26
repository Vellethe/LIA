import React, { useState } from 'react';
import './DropDown.css';

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    <li>Developer</li>
                    <li>Software</li>
                    <li>Fullstack</li>
                    <li>Embedded</li>
                    <li>Backend</li>
                    <li>Frontend</li>
                    <li>Tester</li>
                    <li>Python</li>
                    <li>C#</li>
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
