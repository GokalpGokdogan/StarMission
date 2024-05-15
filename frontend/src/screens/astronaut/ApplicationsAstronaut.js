import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import ApplicationsTable from '../../components/ApplicationsTable';
import SearchBar from '../../components/SearchBar';
import { getApplicationsAstro } from '../../Requests';
import { useUser } from '../../UserProvider';
import DashboardTableAstronaut from '../../components/DashboardTableAstronaut';
import Header from '../../components/Header';

const ApplicationsAstronaut = () => {

  const {userId} = useUser();
  const [searchText, setSearchText] = useState('');
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try{
        const apps = await getApplicationsAstro();
        if(apps == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setApplications(apps);
          console.log("Applications");
          console.log(apps);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

useEffect(() => {
  fetchApplications();
}, []);


  return (
    <div className="flex flex-col h-screen">
    <Header title={"My Applications"}/>

      <div className="flex-1 bg-home-bg flex flex-col items-center gap-4 p-8">
        <SearchBar input={searchText} onChange={(e) => setSearchText(e.target.value)}></SearchBar>
        <div className="shadow-lg w-2/3 h-full">
            <DashboardTableAstronaut data={applications} showHeader={false} searchText={searchText}/>        
        </div>
      </div>
    </div>
  );
};



export default ApplicationsAstronaut;