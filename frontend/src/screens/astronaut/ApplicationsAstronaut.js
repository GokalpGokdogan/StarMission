import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import ApplicationsTable from '../../components/ApplicationsTable';
import SearchBar from '../../components/SearchBar';

const ApplicationsAstronaut = () => {

  const [searchText, setSearchText] = useState('');

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
    <div className="flex flex-col h-screen">
      <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
        <p className='font-poppins font-bold text-white text-2xl p-4 ml-2'>Applications</p>
      </div>
      <div className="flex-1 bg-home-bg flex flex-col items-center gap-4 p-8">
        <SearchBar input={searchText} onChange={(e) => setSearchText(e.target.value)}></SearchBar>
        <div className="shadow-lg w-2/3 h-full">
          <ApplicationsTable searchText={searchText} dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
};


export default ApplicationsAstronaut;