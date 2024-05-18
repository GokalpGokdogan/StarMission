import React, { useEffect, useState } from 'react';
import MissionApplicant from "../components/MissionApplicant";
import { useParams, NavLink } from "react-router-dom";
import { getCompanyData } from "../Requests";
import Header from '../components/Header';
import { useUser } from '../UserProvider';
import { Avatar } from '@mui/material';

const EditProfile = ({ type }) => {

  const { userId } = useUser();
  const [companyInfo, setCompanyInfo] = useState([]);

  const fetchCompanyInfo = async () => {
    try {
      const info = await getCompanyData(userId);
      if (info == "No applications found with these filters") {
        console.log("ahah")
      }
      else {
        setCompanyInfo(info);
        console.log(info);
      }

    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const formatDate = (date) => {
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    return day + "." + month + "." + year;
  }

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return (
    <div className="bg-home-bg min-h-screen">
      <Header title={"Edit Profile"} />
      {/* <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
          <div className='flex-auto flex-col gap-8 flex p-8 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg min-h-96'>
            <div className='flex flex-row gap-4 items-center'>       
                 <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
               <div>
                <h2 className="text-3xl font-bold text-main-text mt-5">{companyInfo.name}</h2>
                <div className='flex flex-row gap-2 items-center'>
                  <p className="text-md font-medium leading-5 text-sub-text">Foundation date:</p>
                  <input type="text" name="name" value={`${companyInfo.foundation_date ? formatDate(companyInfo.foundation_date) : null}`} id="name" className="bg-grey-bg w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"  placeholder="Edit foundation date" ></input>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p className="text-md font-semibold leading-5 mr-3 text-main-text">Company Description</p>
              <textarea
                  type="description"
                  placeholder="Enter description"
                  value={companyInfo.description}
                  className="flex flex-col border bg-grey-bg h-32 rounded-lg p-2 resize-none" 
                  row={3}
              />
            </div>
            <div className='flex flex-row items-center gap-2'>
              <p className="text-md font-medium leading-5 text-main-text">Balance ($)</p>
              <input type="text" name="name" value={`${companyInfo.balance ? companyInfo.balance : null}`} id="name" className="bg-grey-bg w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" placeholder="Edit budget"></input>
            </div>
            <div>
            </div>
          </div>
        </div>
        
      </div> */}
      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <div className="flex items-center ml-8 mt-8 gap-4">
              <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
              <div>
                <h2 className="text-3xl font-bold text-main-text mt-5">{companyInfo.name}</h2>
                <div className='flex flex-row gap-2 items-center'>
                  <p className="text-md font-medium leading-5 text-sub-text">Foundation date:</p>
                  <input type="text" name="name" value={`${companyInfo.foundation_date ? formatDate(companyInfo.foundation_date) : null}`} id="name" className="bg-grey-bg w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" placeholder="Edit foundation date" ></input>
                </div>
              </div>
            </div>
            <p className="text-xl font-semibold leading-5 mt-12 ml-10 mr-3 text-main-text">Company Description</p>
            <textarea
                  type="description"
                  placeholder="Enter description"
                  value={companyInfo.description}
                  className="flex flex-col border bg-grey-bg mt-4 h-32 rounded-lg p-2 resize-none" 
                  row={3}
            />
            <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Balance:</p>
             <input type="text" name="name" value={`${companyInfo.balance ? companyInfo.balance : null}`} id="name" className="bg-grey-bg ml-10 mt-4 w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" placeholder="Edit budget"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;