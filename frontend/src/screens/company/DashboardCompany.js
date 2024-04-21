import React, { useState } from 'react';
import {Link, Route} from 'react-router-dom';
import PastMissions from '../../components/PastMissions';
import ApplicationsTable from '../../components/ApplicationsTable';
import DashboardTable from '../../components/DashboardTable';

const DashboardCompany = () => {

const[searchText, setSearchText] = useState('');
const dataSource = [
    {
      key: '1',
      name: 'Asteroid',
      progress: 'Accepted',
      date: '10-02-2022',
    },
    {
      key: '2',
      name: 'Misyon',
      progress: 'Rejected',
      date: '10-02-2022',
    },
    {
      key: '3',
      name: 'Nehir Demir',
      progress: 'In progress',
      date: '10-02-2022',
    },

  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
          return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (text, record, index) => (
        <>
        <div className='flex flex-row gap-2'>
  {/*            <CheckCircleFilled style={record.progress == 'Rejected' ? {color: '#FF3B30'} : (record.progress == 'Accepted' ? {color: '#51C080'} : {color: '#FFCE20'})}/>
  */}           <p>{record.progress}</p>
            </div>
        </>
    ) 
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];


  return (
        <div className="bg-home-bg h-full">
            <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
                <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Dashboard</p>
            </div>
            <div className='p-4'>
            <div className=" grid grid-cols-2 grid-rows-2 gap-4">
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
                        <DashboardTable/>
                </div>
            </div>
            </div>
        </div>
  );
};


export default DashboardCompany;