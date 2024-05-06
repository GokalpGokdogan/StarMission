import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import BidModal from '../../components/BidModal';
import { getMissionData } from '../../Requests';

const ProfileCompany = () => {

const data = {
    name: 'Profiline baktiginiz companyy',
    foundation_date: "06.05.2024",
    description: 'ted States, Washington DCUnington DCUninited States, Washington DCUninited States, Washington DCUnies, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DC',
    balance: '20.000',
 }

return (
    <div className="bg-home-bg min-h-screen">
      <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
        <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>My Profile</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <div className="flex items-center ml-8 mt-8">
              <img width="120" height="120" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
              <div>
              <h2 className="text-3xl font-bold text-main-text mt-5">{data.name}</h2>
            <p className="truncate text-sm leading-5 text-sub-text">Founded in {data.foundation_date}</p>
              </div>
            </div>
            <p className="text-xl font-semibold leading-5 mt-12 ml-10 mr-3 text-main-text">Company Description</p>
            <div className="flex flex-col px-1 py-5 mt-4 ml-8 mr-8 mb-4 w-128 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{data.description}</p>
            </div>
            <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Balance:</p>
            <div className="px-1 py-5 ml-8 mr-8 mt-4 mb-4 items-center bg-grey-bg rounded-xl">
              <p className="text-xl font-semibold leading-5 ml-3 mr-3 text-main-text">${data.balance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};

export default ProfileCompany;