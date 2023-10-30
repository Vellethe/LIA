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



    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">Skills</button>
            {isOpen && (
                <div className="scrollMenu" onMouseLeave={() => setIsOpen(false)}>
                    <ul className="dropdown-list">
                        <li>
                            <input defaultChecked={selectedTags.includes("developer")} onChange={() => handleDropdownTick("developer")} type="checkbox" id="developer" />
                            <label htmlFor="developer">Developer</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("software")} onChange={() => handleDropdownTick("software")} type="checkbox" id="software" />
                            <label htmlFor="software">Software</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("fullstack")} onChange={() => handleDropdownTick("fullstack")} type="checkbox" id="fullstack" />
                            <label htmlFor="fullstack">Fullstack</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("embedded")} onChange={() => handleDropdownTick("embedded")} type="checkbox" id="embedded" />
                            <label htmlFor="embedded">Embedded</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("backend")} onChange={() => handleDropdownTick("backend")} type="checkbox" id="backend" />
                            <label htmlFor="backend">Backend</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("frontend")} onChange={() => handleDropdownTick("frontend")} type="checkbox" id="frontend" />
                            <label htmlFor="frontend">Frontend</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("tester")} onChange={() => handleDropdownTick("tester")} type="checkbox" id="tester" />
                            <label htmlFor="tester">Tester</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("python")} onChange={() => handleDropdownTick("python")} type="checkbox" id="python" />
                            <label htmlFor="python">Python</label>
                        </li>
                        <li>
                            <input defaultChecked={selectedTags.includes("csharp")} onChange={() => handleDropdownTick("csharp")} type="checkbox" id="csharp" />
                            <label htmlFor="csharp">C#</label>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
