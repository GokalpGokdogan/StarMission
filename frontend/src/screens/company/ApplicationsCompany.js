import React, { useState, useEffect } from 'react';
import {Link, Route} from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import SingleApplication from '../../components/SingleApplication'
import { getApplications } from '../../Requests';

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

  const [applications, setApplications] = useState([]);

  useEffect(() => {
      const fetchApplications = async () => {
          try{
              const apps = await getApplications(64);
              if(apps == "No applications found with these filters")
              {
                console.log("ahah")
              }
              else
              {
                setApplications(apps);
                console.log(apps);
              }
              
          } catch (error){
              console.error('Error fetching apps:', error);
          }
      };

      fetchApplications();
  }, []);

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Applications</p>
        </div>
        <div class="flex justify-center mt-6 mb-12">
          <SearchBar input="INPUT"/>
        </div>
        <div>
        {applications.map(application => (
              <SingleApplication
                key={application.key}
                name={application.astronaut_name}
                mission={application.name}
                nationality={application.nationality}
              />
            ))}
        </div>
    </div>
  );
};


export default ApplicationsCompany;