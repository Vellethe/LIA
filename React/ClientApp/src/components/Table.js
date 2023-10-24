import React from "react";
import "./Table.css";
import { TableEntry } from "./TableEntry"

export const Table2 = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th className="name">Name</th>
                    <th className="text">Role</th>
                    <th className="text">Contact name</th>
                    <th className="text">date</th>
                    <th className="text">Location</th>
                    <th className="text">tags</th>
                </tr>
            </thead>
            <tbody>
                <TableEntry/>
                <TableEntry/>
                <TableEntry/>
            </tbody>
        </table>
    )
}

export const Table = () => {
    return (
        <div className="table">
            <div className="overlap">
                <div className="overlap-group">
                    <div className="card-container" />
                    <div className="div" />
                    <div className="frame">
                        <div className="overlap-wrapper">
                            <div className="overlap-2">
                                <div className="frame-2">
                                    <div className="overlap-3">
                                        <div className="card-container-2" />
                                        <div className="card-container-2" />
                                        <div className="text-wrapper">Arbetsförmedligen</div>
                                        <div className="text-wrapper-2">Systemutvecklare/programmerare</div>
                                    </div>
                                    <div className="overlap-group-2">
                                        <div className="text-wrapper-3">2023-10-18</div>
                                        <div className="text-wrapper-4">Alexander Andersson</div>
                                    </div>
                                    <img className="vector" alt="Vector" src="vector.svg" />
                                </div>
                                <img className="image" alt="Image" src="image-3.png" />
                            </div>
                        </div>
                        <div className="overlap-group-wrapper">
                            <div className="overlap-4">
                                <div className="frame-3">
                                    <div className="overlap-group-3">
                                        <div className="text-wrapper-5">Developer</div>
                                        <div className="card-container-3" />
                                        <div className="text-wrapper-6">Power</div>
                                    </div>
                                    <div className="text-wrapper-7">Karl karlson</div>
                                    <img className="img" alt="Vector" src="vector-2.svg" />
                                </div>
                                <img className="image-2" alt="Image" src="image-4.png" />
                                <div className="text-wrapper-8">2023-9-18</div>
                            </div>
                        </div>
                        <div className="div-wrapper">
                            <div className="overlap-5">
                                <div className="frame-2">
                                    <div className="overlap-group-4">
                                        <div className="text-wrapper-9">C#</div>
                                        <div className="card-container-4" />
                                        <div className="text-wrapper-10">Stadium</div>
                                    </div>
                                    <div className="text-wrapper-11">Henrik henrikson</div>
                                    <img className="vector" alt="Vector" src="vector-3.svg" />
                                </div>
                                <img className="image-3" alt="Image" src="image-5.png" />
                                <div className="text-wrapper-12">2023-10-11</div>
                            </div>
                        </div>
                        <div className="frame-4">
                            <div className="overlap-6">
                                <div className="frame-2">
                                    <div className="overlap-group-5">
                                        <div className="text-wrapper-13">Javascript</div>
                                        <div className="card-container-4" />
                                        <div className="text-wrapper-14">City Gross</div>
                                    </div>
                                    <div className="text-wrapper-15">Lars Göransson</div>
                                    <img className="vector-2" alt="Vector" src="vector-4.svg" />
                                </div>
                                <img className="image-4" alt="Image" src="image-6.png" />
                                <div className="text-wrapper-16">2023-10-2</div>
                            </div>
                        </div>
                        <div className="frame-5">
                            <div className="overlap-7">
                                <div className="frame-6">
                                    <div className="overlap-group-6">
                                        <div className="text-wrapper-17">Python</div>
                                        <div className="card-container-4" />
                                        <div className="text-wrapper-10">Ica</div>
                                    </div>
                                    <div className="text-wrapper-18">Abram Hansson</div>
                                    <img className="image-5" alt="Image" src="image-7.png" />
                                    <img className="vector-3" alt="Vector" src="vector-5.svg" />
                                </div>
                                <div className="text-wrapper-19">2023-10-3</div>
                            </div>
                        </div>
                        <div className="frame-7">
                            <div className="overlap-4">
                                <div className="frame-3">
                                    <div className="overlap-group-7">
                                        <div className="text-wrapper-20">Software</div>
                                        <div className="card-container-3" />
                                        <div className="text-wrapper-6">Power</div>
                                    </div>
                                    <div className="text-wrapper-21">Karl karlson</div>
                                    <img className="img" alt="Vector" src="vector-6.svg" />
                                </div>
                                <img className="image-6" alt="Image" src="image.png" />
                                <div className="text-wrapper-22">2023-9-18</div>
                            </div>
                        </div>
                        <div className="frame-8">
                            <div className="overlap-8">
                                <div className="frame-6">
                                    <div className="overlap-group-8">
                                        <div className="text-wrapper-23">Javascript</div>
                                        <div className="card-container-4" />
                                        <div className="text-wrapper-10">Ica</div>
                                    </div>
                                    <div className="text-wrapper-24">Abram Hansson</div>
                                    <img className="image-7" alt="Image" src="image-7-2.png" />
                                    <img className="vector-3" alt="Vector" src="vector-7.svg" />
                                </div>
                                <div className="text-wrapper-25">2023-10-3</div>
                            </div>
                        </div>
                        <div className="frame-9">
                            <div className="overlap-9">
                                <div className="frame-10">
                                    <div className="overlap-group-9">
                                        <div className="text-wrapper-13">Embedded</div>
                                        <div className="card-container-3" />
                                        <div className="text-wrapper-6">Power</div>
                                    </div>
                                    <div className="text-wrapper-21">Karl karlson</div>
                                    <img className="img" alt="Vector" src="vector-8.svg" />
                                </div>
                                <img className="image-8" alt="Image" src="image-4-2.png" />
                                <div className="text-wrapper-26">2023-9-18</div>
                            </div>
                        </div>
                    </div>
                    <div className="group">
                        <div className="overlap-10">
                            <div className="text-wrapper-27">Role</div>
                            <div className="polygon-wrapper">
                                <img className="polygon" alt="Polygon" src="polygon-21-3.svg" />
                            </div>
                        </div>
                    </div>
                    <div className="frame-11">
                        <div className="group-2">
                            <div className="text-wrapper-28">Company</div>
                            <div className="img-wrapper">
                                <img className="polygon" alt="Polygon" src="polygon-21-4.svg" />
                            </div>
                        </div>
                        <div className="group-3">
                            <div className="overlap-group-10">
                                <div className="text-wrapper-29">Date</div>
                                <div className="group-4">
                                    <img className="polygon-2" alt="Polygon" src="image.svg" />
                                </div>
                            </div>
                        </div>
                        <div className="group-5">
                            <div className="text-wrapper-30">Contact</div>
                            <div className="group-6">
                                <img className="polygon" alt="Polygon" src="polygon-21.svg" />
                            </div>
                        </div>
                        <div className="group-7">
                            <div className="overlap-11">
                                <div className="text-wrapper-31">Favorit</div>
                                <div className="group-8">
                                    <img className="polygon" alt="Polygon" src="polygon-21-2.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-wrapper-32">Location</div>
                    <div className="text-wrapper-33">Tags</div>
                    <div className="text-wrapper-34">Location</div>
                    <div className="embedded-frontend">
                        Embedded, Frontend,
                        <br />
                        Backend, Developer,
                        <br />
                        Python, Software
                    </div>
                    <div className="embedded-frontend-2">
                        Embedded
                        <br />
                        Frontend
                    </div>
                    <div className="embedded-frontend-3">
                        Embedded
                        <br />
                        Frontend
                    </div>
                    <div className="embedded-frontend-4">
                        Embedded
                        <br />
                        Frontend
                    </div>
                    <div className="embedded-frontend-5">
                        Embedded
                        <br />
                        Frontend
                    </div>
                    <div className="embedded-frontend-6">
                        Embedded
                        <br />
                        Frontend
                    </div>
                    <div className="embedded-frontend-7">
                        Embedded
                        <br />
                        Frontend
                    </div>
                    <div className="embedded-frontend-8">
                        Embedded
                        <br />
                        Frontend
                    </div>
                    <div className="text-wrapper-35">Location</div>
                    <div className="text-wrapper-36">Location</div>
                    <div className="text-wrapper-37">Location</div>
                    <div className="text-wrapper-38">Location</div>
                    <div className="text-wrapper-39">Location</div>
                    <div className="text-wrapper-40">Location</div>
                </div>
                <div className="text-wrapper-41">Location</div>
            </div>
        </div>
    );
};
