import React, { useState } from 'react';
import {Link, Route} from 'react-router-dom';
import PastMissions from '../../components/PastMissions';
import ApplicationsTable from '../../components/ApplicationsTable';

const dataSource = [
    {
      key: '1',
      name: 'Habibe',
      progress: 'Accepted',
      date: '10-02-2022',
    },
    {
      key: '2',
      name: 'Öykü',
      progress: 'Rejected',
      date: '10-02-2022',
    },
    {
      key: '3',
      name: 'Doruk',
      progress: 'In progress',
      date: '10-02-2022',
    },
];

const DashboardCompany = () => {

  return (
        <div className="bg-home-bg h-full">
            <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
                <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Dashboard</p>
            </div>
            <div className=" grid grid-cols-2 grid-rows-2 p-4 gap-4">
                <div className="flex items-center justify-center">
                    <PastMissions />
                </div>
                <div className=" flex items-center justify-center">
                    <PastMissions />
                </div>
                <div className="flex items-center justify-center">
                    <PastMissions />
                </div>
                <div className="flex items-center justify-center shadow-">
                    <div style={{ width: '530px', height: '250px' }} className='shadow-lg'>
                        <ApplicationsTable dataSource={dataSource} />
                    </div>
                </div>
            </div>
        </div>

  );
};


export default DashboardCompany;