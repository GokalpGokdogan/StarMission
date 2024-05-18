import React, {useEffect, useState} from 'react';
import MissionApplicant from "../components/MissionApplicant";
import {useParams, NavLink} from "react-router-dom";
import {getApplicationData} from "../Requests";
import Header from '../components/Header';

const EditProfile = ({type}) => {
    const { astronautId, missionId, appliedDate } = useParams();
    const [applicationData, setApplicationData] = useState({});

    return (
        <div className="bg-home-bg min-h-screen">
          <Header title={"My Profile"}/>
    
          <div className="flex justify-center">
            <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
              <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
                <div className="flex items-center ml-8 mt-8">
                  <img width="120" height="120" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
                  <div>
                  <h2 className="text-3xl font-bold text-main-text mt-5"></h2>
                <p className="truncate text-sm leading-5 text-sub-text">Foundation date:</p>
                  </div>
                </div>
                <p className="text-xl font-semibold leading-5 mt-12 ml-10 mr-3 text-main-text">Company Description</p>
                <div className="flex flex-col px-1 py-5 mt-4 ml-8 mr-8 mb-4 w-128 bg-grey-bg rounded-xl">
                  <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text"></p>
                </div>
                <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Balance:</p>
                <label htmlFor="email" className="mt-6 text-white text-sm">Email</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Mission Name" required="" />

              </div>
            </div>
          </div>
        </div>
    );
    };

export default EditProfile;