import React, { useState } from 'react';
import './DropDown.css';

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">Skills</button>
            {isOpen && (
                <div className="scrollMenu">
                <ul className="dropdown-list">
                        <li>
                            <input type="checkbox" id="developer" />
                            <label htmlFor="developer">Developer</label>
                        </li>
                        <li>
                            <input type="checkbox" id="software" />
                            <label htmlFor="software">Software</label>
                        </li>
                        <li>
                            <input type="checkbox" id="fullstack" />
                            <label htmlFor="fullstack">Fullstack</label>
                        </li>
                        <li>
                            <input type="checkbox" id="embedded" />
                            <label htmlFor="embedded">Embedded</label>
                        </li>
                        <li>
                            <input type="checkbox" id="backend" />
                            <label htmlFor="backend">Backend</label>
                        </li>
                        <li>
                            <input type="checkbox" id="frontend" />
                            <label htmlFor="frontend">Frontend</label>
                        </li>
                        <li>
                            <input type="checkbox" id="tester" />
                            <label htmlFor="tester">Tester</label>
                        </li>
                        <li>
                            <input type="checkbox" id="python" />
                            <label htmlFor="python">Python</label>
                        </li>
                        <li>
                            <input type="checkbox" id="csharp" />
                            <label htmlFor="csharp">C#</label>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
