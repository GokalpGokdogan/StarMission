import React, {useEffect, useState} from 'react';
import MissionApplicant from "../components/MissionApplicant";
import {useParams} from "react-router-dom";
import {getApplicationData} from "../Requests";


const EditProfile = ({type}) => {
    const { astronautId, missionId, appliedDate } = useParams();
    const [applicationData, setApplicationData] = useState({});

    return (
    <div className="bg-home-bg h-full min-h-screen flex flex-col">

        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Application</p>
        </div>
        <div className="flex flex-grow justify-center items-center">
        <div className="flex justify-center items-center h-full">
           
                <div className="flex flex-col w-full max-w-4xl p-8 border rounded-xl h-96 bg-white shadow-lg justify-between">
                <div className="flex">
                    <div className="flex items-center">
                        <img width="120" height="120" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <h2 className="text-2xl text-main-text font-semibold mb-4"></h2>
                        <div className="flex justify-between">
                            <div className="">
                                <p className="text-sm font-medium leading-6 text-main-text">Nationality: amk</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Profession: amk</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Gender: amk</p>
                                <p className="truncate text-sm font-medium leading-6 text-main-text">Address: amk</p>
                            </div>
                            <div className="">
                                <p className="text-sm font-medium leading-6 text-main-text">Age: </p>
                                <p className="text-sm font-medium leading-6 text-main-text">Height:  cm</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Weight:  kg</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Birthday:</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-auto flex-col flex min-w-0 mt-2 p-2 border rounded-xl border-transparent border-10 bg-grey-bg">
                    <p className="truncate text-sm font-medium leading-6 text-main-text"></p>
                </div>
                <div className= "flex justify-end">
                    <div className="flex">
                        <div className="flex mt-4 mb-2 mr-4">
                            <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-300" type="button">Start Date:</span>
                            <div className="relative w-28">
                                <input
                                    className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300"
                                    placeholder="dd.mm.yyyy"
                                    required />
                            </div>
                        </div>
                        <div className="flex mt-4 mb-2 mr-4">
                            <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300  focus:ring-4 focus:outline-none focus:ring-gray-300" type="button">Salary:</span>
                            <div className="relative w-28">
                                <input
                                    className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300"
                                    placeholder="Enter Salary"
                                    required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    </div>

    );
};

export default EditProfile;