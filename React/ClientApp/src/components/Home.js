/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
//import React from "react";
import { Header } from "./Header";
import { Table } from "./Table";
import "./HomePageStyle.css";
//import "./Testingstyle.css";
import "./Table.css";



export const HomePage = () => {
    return (
        <div className="home-page">
            <div className="div">
                <div className="overlap">
                    <div className="group">
                        <div className="text-wrapper">Amount of companies</div>
                        <div className="text-wrapper-2">1000</div>
                    </div>
                    <div className="overlap-group">
                        <header className="header">
                            {/*<img className="image" alt="Image" src="image-28.png" />*/}
                            <div className="nav-bar">
                                <div className="about-button">
                                    <div className="text-wrapper-3">Excluded</div>
                                </div>
                                <div className="overlap-group-2">
                                    <div className="div-wrapper">
                                        <div className="text-wrapper-4">Settings</div>
                                    </div>
                                    <div className="home-button">
                                        <div className="text-wrapper-5">Home</div>
                                    </div>
                                </div>
                            </div>
                            {/*<img className="img" alt="Group" src="group.png" />*/}
                            <div className="text-wrapper-6">Logout</div>
                        </header>
                        <div className="group-2">
                            <div className="star">
                                {/*<img className="vector" alt="Vector" src="vector.svg" />*/}
                                <div className="text-wrapper-7">only stared</div>
                            </div>
                            <div className="overlap-2">
                                <div className="rectangle" />
                                <div className="text-wrapper-8">And</div>
                            </div>
                            <div className="text-wrapper-9">And/Or tags</div>
                            <div className="group-3">
                                <div className="c">
                                    {/*<img className="vector-2" alt="Vector" src="image.svg" />*/}
                                    <div className="text-wrapper-10">c#</div>
                                </div>
                                <div className="developer">
                                    {/*<img className="vector-3" alt="Vector" src="vector-2.svg" />*/}
                                    <div className="text-wrapper-11">Developer</div>
                                </div>
                                <div className="embeded">
                                    {/*<img className="vector-4" alt="Vector" src="vector-3.svg" />*/}
                                    <div className="text-wrapper-12">Embedded</div>
                                </div>
                                <div className="overlap-group-3">
                                    <div className="software">
                                        {/*<img className="vector-4" alt="Vector" src="vector-4.svg" />*/}
                                        <div className="text-wrapper-13">Software</div>
                                    </div>
                                    <div className="backend">
                                        {/*<img className="vector-4" alt="Vector" src="vector-9.svg" />*/}
                                        <div className="text-wrapper-13">Backend</div>
                                    </div>
                                </div>
                                <div className="python">
                                   {/* <img className="vector-4" alt="Vector" src="vector-5.svg" />*/}
                                    <div className="text-wrapper-14">python</div>
                                </div>
                                <div className="overlap-3">
                                    <div className="frontend">
                                        {/*<img className="vector-5" alt="Vector" src="vector-6.svg" />*/}
                                        <div className="text-wrapper-14">Frontend</div>
                                    </div>
                                    <div className="fullstack">
                                        {/*<img className="vector-6" alt="Vector" src="vector-7.svg" />*/}
                                        <div className="text-wrapper-14">Fullstack</div>
                                    </div>
                                </div>
                                <div className="tester">
                                    {/*<img className="vector-4" alt="Vector" src="vector-8.svg" />*/}
                                    <div className="text-wrapper-14">Tester</div>
                                </div>
                            </div>
                        </div>
                        {/*<img className="polygon" alt="Polygon" src="polygon-21.svg" />*/}
                        <div className="search-bar">
                            <div className="overlap-4">
                                <div className="text-wrapper-15">Text search</div>
                            </div>
                            <div className="rectangle-2" />
                            <div className="rectangle-3" />
                        </div>
                        <div className="text-wrapper-16">FROM</div>
                        <div className="text-wrapper-17">TO</div>
                        <div className="text-wrapper-18">20-10-2023</div>
                        <div className="text-wrapper-19">26-10-2023</div>
                    </div>
                </div>
                <div className="table">
                    <div className="overlap-5">
                        <div className="overlap-6">
                            <div className="card-container" />
                            <div className="card-container-2" />
                            <div className="frame">
                                <div className="overlap-wrapper">
                                    <div className="overlap-7">
                                        <div className="frame-2">
                                            <div className="overlap-8">
                                                <div className="card-container-3" />
                                                <div className="card-container-3" />
                                                <div className="text-wrapper-20">Arbetsförmedligen</div>
                                                <div className="text-wrapper-21">Systemutvecklare/programmerare</div>
                                            </div>
                                            <div className="overlap-group-4">
                                                <div className="text-wrapper-22">2023-10-18</div>
                                                <div className="text-wrapper-23">Alexander Andersson</div>
                                            </div>
                                            {/*<img className="vector-7" alt="Vector" src="vector-10.svg" />*/}
                                        </div>
                                        {/*<img className="image-2" alt="Image" src="image-3.png" />*/}
                                    </div>
                                </div>
                                <div className="overlap-group-wrapper">
                                    <div className="overlap-9">
                                        <div className="frame-3">
                                            <div className="overlap-group-5">
                                                <div className="text-wrapper-24">Developer</div>
                                                <div className="card-container-4" />
                                                <div className="text-wrapper-25">Power</div>
                                            </div>
                                            <div className="text-wrapper-26">Karl karlson</div>
                                            {/*<img className="vector-8" alt="Vector" src="vector-11.svg" />*/}
                                        </div>
                                        {/*<img className="image-3" alt="Image" src="image-4.png" />*/}
                                        <div className="text-wrapper-27">2023-9-18</div>
                                    </div>
                                </div>
                                <div className="frame-4">
                                    <div className="overlap-10">
                                        <div className="frame-2">
                                            <div className="overlap-group-6">
                                                <div className="text-wrapper-28">C#</div>
                                                <div className="card-container-5" />
                                                <div className="text-wrapper-29">Stadium</div>
                                            </div>
                                            <div className="text-wrapper-30">Henrik henrikson</div>
                                            {/*<img className="vector-7" alt="Vector" src="vector-12.svg" />*/}
                                        </div>
                                        {/*<img className="image-4" alt="Image" src="image-5.png" />*/}
                                        <div className="text-wrapper-31">2023-10-11</div>
                                    </div>
                                </div>
                                <div className="frame-5">
                                    <div className="overlap-11">
                                        <div className="frame-2">
                                            <div className="overlap-group-7">
                                                <div className="text-wrapper-32">Javascript</div>
                                                <div className="card-container-5" />
                                                <div className="text-wrapper-33">City Gross</div>
                                            </div>
                                            <div className="text-wrapper-34">Lars Göransson</div>
                                            {/*<img className="vector-9" alt="Vector" src="vector-13.svg" />*/}
                                        </div>
                                        {/*<img className="image-5" alt="Image" src="image-6.png" />*/}
                                        <div className="text-wrapper-35">2023-10-2</div>
                                    </div>
                                </div>
                                <div className="frame-6">
                                    <div className="overlap-12">
                                        <div className="frame-7">
                                            <div className="overlap-group-8">
                                                <div className="text-wrapper-36">Python</div>
                                                <div className="card-container-5" />
                                                <div className="text-wrapper-29">Ica</div>
                                            </div>
                                            <div className="text-wrapper-37">Abram Hansson</div>
                                            {/*<img className="image-6" alt="Image" src="image-7.png" />*/}
                                            {/*<img className="vector-10" alt="Vector" src="vector-14.svg" />*/}
                                        </div>
                                        <div className="text-wrapper-38">2023-10-3</div>
                                    </div>
                                </div>
                                <div className="frame-8">
                                    <div className="overlap-9">
                                        <div className="frame-3">
                                            <div className="overlap-group-9">
                                                <div className="text-wrapper-39">Software</div>
                                                <div className="card-container-4" />
                                                <div className="text-wrapper-25">Power</div>
                                            </div>
                                            <div className="text-wrapper-40">Karl karlson</div>
                                            {/*<img className="vector-8" alt="Vector" src="vector-15.svg" />*/}
                                        </div>
                                        {/*<img className="image-7" alt="Image" src="image.png" />*/}
                                        <div className="text-wrapper-41">2023-9-18</div>
                                    </div>
                                </div>
                                <div className="frame-9">
                                    <div className="overlap-13">
                                        <div className="frame-7">
                                            <div className="overlap-group-10">
                                                <div className="text-wrapper-42">Javascript</div>
                                                <div className="card-container-5" />
                                                <div className="text-wrapper-29">Ica</div>
                                            </div>
                                            <div className="text-wrapper-43">Abram Hansson</div>
                                            {/*<img className="image-8" alt="Image" src="image-7-2.png" />*/}
                                            {/*<img className="vector-10" alt="Vector" src="vector-16.svg" />*/}
                                        </div>
                                        <div className="text-wrapper-44">2023-10-3</div>
                                    </div>
                                </div>
                                <div className="frame-10">
                                    <div className="overlap-14">
                                        <div className="frame-11">
                                            <div className="overlap-group-11">
                                                <div className="text-wrapper-32">Embedded</div>
                                                <div className="card-container-4" />
                                                <div className="text-wrapper-25">Power</div>
                                            </div>
                                            <div className="text-wrapper-40">Karl karlson</div>
                                            {/*<img className="vector-8" alt="Vector" src="vector-17.svg" />*/}
                                        </div>
                                        {/*<img className="image-9" alt="Image" src="image-4-2.png" />*/}
                                        <div className="text-wrapper-45">2023-9-18</div>
                                    </div>
                                </div>
                            </div>
                            <div className="group-4">
                                <div className="overlap-15">
                                    <div className="text-wrapper-46">Role</div>
                                    <div className="polygon-wrapper">
                                        {/*<img className="polygon-2" alt="Polygon" src="polygon-21-2.svg" />*/}
                                    </div>
                                </div>
                            </div>
                            <div className="frame-12">
                                <div className="group-5">
                                    <div className="text-wrapper-47">Company</div>
                                    {/*<div className="img-wrapper">*/}
                                    {/*    */}{/*<img className="polygon-2" alt="Polygon" src="polygon-21-3.svg" />*/}
                                    {/*</div>*/}
                                </div>
                                <div className="group-6">
                                    <div className="overlap-group-12">
                                        <div className="text-wrapper-48">Date</div>
                                        <div className="group-7">
                                            {/*<img className="polygon-3" alt="Polygon" src="polygon-21-4.svg" />*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="group-8">
                                    <div className="text-wrapper-49">Contact</div>
                                    <div className="group-9">
                                        {/*<img className="polygon-2" alt="Polygon" src="polygon-21-5.svg" />*/}
                                    </div>
                                </div>
                                <div className="group-10">
                                    <div className="overlap-16">
                                        <div className="text-wrapper-50">Favorit</div>
                                        <div className="group-11">
                                            {/*<img className="polygon-2" alt="Polygon" src="polygon-21-6.svg" />*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-wrapper-51">Location</div>
                            <div className="text-wrapper-52">Tags</div>
                            <div className="location">Göteborg</div>
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
                            <div className="text-wrapper-53">Location</div>
                            <div className="text-wrapper-54">Location</div>
                            <div className="text-wrapper-55">Location</div>
                            <div className="text-wrapper-56">Location</div>
                            <div className="text-wrapper-57">Location</div>
                            <div className="text-wrapper-58">Location</div>
                        </div>
                        <div className="text-wrapper-59">Location</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

