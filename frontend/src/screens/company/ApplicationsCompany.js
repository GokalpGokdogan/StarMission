import React, { useState } from 'react';
import {Link, Route} from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import SingleApplication from '../../components/SingleApplication'

const dataSource = [
  {
    key: '1',
    name: 'Lisa George',
    mission: 'Space Mission',
    nationality: 'United Kingdom',
  },
  {
    key: '2',
    name: 'Tevfik Emre Sungur',
    mission: 'Asteroid Ceres',
    nationality: 'Turkey',
  },
  {
    key: '3',
    name: 'Gökalp Gökdoğan',
    mission: 'Finding Water in Mars',
    nationality: 'Turkey',
  },
 
  {
    key: '4',
    name: 'Hans Stark',
    mission: 'Space Discovery',
    nationality: 'Germany',
  }
];

const ApplicationsCompany = () => {

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Applications</p>
        </div>
        <div class="flex justify-center mt-6 mb-12">
          <SearchBar input="INPUT"/>
        </div>
        <div>
        {dataSource.map(application => (
              <SingleApplication
                key={application.key}
                name={application.name}
                mission={application.mission}
                nationality={application.nationality}
              />
            ))}
        </div>
    </div>
  );
};


export default ApplicationsCompany;