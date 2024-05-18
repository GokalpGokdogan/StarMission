import React, { Fragment, useState, useEffect } from 'react';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import BidModal from '../../components/BidModal';
import { getMissionData } from '../../Requests';
import Header from '../../components/Header';
import { getCompanyData } from '../../Requests';
import { useUser } from '../../UserProvider';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';

const ProfileCompany = () => {

  const {userId} = useUser();
  const [companyInfo, setCompanyInfo] = useState([]);

  const fetchCompanyInfo = async () => {
    try{
        const info = await getCompanyData(userId);
        if(info == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setCompanyInfo(info);
          console.log(info);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

const formatDate = (date) => {
  var day = new Date(date).getDate();
  var month = new Date(date).getMonth() + 1;
  var year = new Date(date).getFullYear();

  if(day < 10){
    day = "0" + day;
  }

  if(month < 10){
    month = "0" + month;
  }

  return day + "." + month + "." + year;
}

useEffect(() => {
  fetchCompanyInfo();
}, []);


return (
    <div className="bg-home-bg min-h-screen">
      <Header title={"My Profile"}/>

      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <div className="flex items-center ml-8 mt-8 gap-4">
              <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
              <div>
              <h2 className="text-3xl font-bold text-main-text mt-5">{companyInfo.name}</h2>
            <p className="break-all text-md leading-5 font-medium text-sub-text">Foundation date: {companyInfo.foundation_date ? formatDate(companyInfo.foundation_date) : "Not specified" }</p>
              </div>
            </div>
            <p className="text-xl font-semibold leading-5 mt-12 ml-10 mr-3 text-main-text">Company Description</p>
            <div className="flex flex-col px-1 py-5 mt-4 ml-8 mr-8 mb-4 w-128 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{companyInfo.description}</p>
            </div>
            <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Balance:</p>
            <div className="px-1 py-5 ml-8 mr-8 mt-4 mb-4 items-center bg-grey-bg rounded-xl">
              <p className="text-xl font-semibold leading-5 ml-3 mr-3 text-main-text">${companyInfo.balance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};

export default ProfileCompany;