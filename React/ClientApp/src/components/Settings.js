import React from "react";
import { NavBar } from "./Navbar";
import "./SettingsPage.css";

export const SettingsPage = () => {
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
                                <div className="text-wrapper-9">Sökord</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group-3">
                    <div className="overlap-8">
                        <div className="text-wrapper-10">nytt sökord</div>
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
