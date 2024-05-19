import React, { Fragment, useState, useEffect } from 'react';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import BidModal from '../../components/BidModal';
import { getAstronautData, getMissionData } from '../../Requests';
import Header from '../../components/Header';
import { getCompanyData } from '../../Requests';
import { useUser } from '../../UserProvider';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';

const ProfileAstronaut = () => {

  const { userId } = useUser();
  const [astronautInfo, setAstronautInfo] = useState([]);
  /*   const [birth_date, setBirthDate] = useState([]);
   */

  const fetchAstronautInfo = async () => {
    try {
      const info = await getAstronautData(userId);
      if (info == "No applications found with these filters") {
        console.log("ahah")
      }
      else {
        setAstronautInfo(info);
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
    fetchAstronautInfo();
  }, []);

  /* useEffect(() => {
    setBirthDate(astronautInfo.birth_date);
  }, [astronautInfo]); */

  return (
    <div className="bg-home-bg min-h-screen">
      <Header title={"My Profile"} />

      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <div className="flex items-center ml-8 mt-8 gap-4">
              <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={ astronautInfo.image_url} />
              <div>
                <h2 className="text-3xl font-bold text-main-text mt-5">{astronautInfo.name}</h2>
                <p className="break-all text-md leading-5 font-medium text-sub-text">{astronautInfo.email}</p>
                <p className="text-sm font-semibold leading-5  mt-1 mr-3 text-sub-text">{astronautInfo.phone}</p>
              </div>
            </div>
            <div>
            <p className="text-lg font-semibold leading-5 mt-4 ml-10 mr-3 text-main-text">Profession</p>
            <div className="flex flex-col px-1 py-5  mt-2 ml-8 mr-8 mb-4 w-48 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{astronautInfo.profession ? astronautInfo.profession : "Not specified"}</p>
            </div>
            </div>
            <p className="text-lg font-semibold leading-5 mt-4 ml-10 mr-3 text-main-text">Description</p>
            <div className="flex flex-col px-1 py-5 mt-4 ml-8 mr-8 mb-4 w-128 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{astronautInfo.description ? astronautInfo.description : "Not specified"}</p>
            </div>
            <p className="text-lg font-semibold leading-5 mt-4 ml-10 mr-3 text-main-text">Address</p>
            <div className="px-1 py-5 ml-8 mr-8 mt-4 mb-4 items-center bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{astronautInfo.address ? astronautInfo.address : "Not specified"}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <div>
                <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Weight (kg)</p>
                <div className="flex flex-col px-1 py-5  mt-2 mr-8 ml-8  mb-4 w-48 bg-grey-bg rounded-xl">
                <p className="text-sm font-semibold leading-5 mr-3 ml-3 text-sub-text">{astronautInfo.weight ? astronautInfo.weight : "Not specified"}</p>
              </div>
              </div>
              <div>
                <p className="text-xl font-semibold leading-5 mt-8 mr-3 text-main-text">Height (cm)</p>
                <div className="flex flex-col px-1 py-5  mt-2 mr-8 mb-4 w-48 bg-grey-bg rounded-xl">
                <p className="text-sm font-semibold leading-5 mr-3 ml-3 text-sub-text">{astronautInfo.height ? astronautInfo.height : "Not specified"}</p>
              </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAstronaut;