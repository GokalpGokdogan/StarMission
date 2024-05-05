import React, { useState, useEffect } from 'react';
import {Link, Route} from 'react-router-dom';
import SimpleList from '../../components/SimpleList';
import ApplicationsTable from '../../components/ApplicationsTable';
import DashboardTable from '../../components/DashboardTable';
import { getLeadingMissions, getApplications, getMyBids, getMissionPostings } from '../../Requests';
import { useUser } from '../../UserProvider';

//PASTMISSIONS COMPONENT SHRINKS IN EMPTY DATA ARRAY!!!!!!!!!!!!!

const DashboardCompany = () => {

  const {userId} = useUser();
  const [leadingMissions, setLeadingMissions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [recentMissions, setRecentMissions] = useState([]);

  const fetchMyBids = async () => {
    try{
        const bids = await getMyBids(userId);
        if(bids == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setMyBids(bids);
          console.log(bids);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

const fetchRecentMissions = async () => {
  try{
      const miss = await getMissionPostings(userId);
      if(miss == "No applications found with these filters")
      {
        console.log("ahah")
      }
      else
      {
        setRecentMissions(miss);
        console.log(miss);
      }
      
  } catch (error){
      console.error('Error fetching missions:', error);
  }
};


  const fetchLeadingMissions = async () => {
    try{
        const leading = await getLeadingMissions(userId);
        if(leading == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setLeadingMissions(leading);
          console.log(leading);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

  const fetchApplications = async () => {
      try{
          const apps = await getApplications(userId);
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

  useEffect(() => {
    fetchLeadingMissions();
    fetchApplications();
    fetchMyBids();
    fetchRecentMissions();
}, []);

  return (
        <div className="bg-home-bg h-full">
            <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
                <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Dashboard</p>
            </div>
            <div className='p-4'>
            <div className="grid grid-cols-2 grid-rows-2 mt-12">
                <div className="flex items-center justify-center px-4 py-1 ml-24">
                    <SimpleList title={"Leading Missions"} data={leadingMissions} type={'mission'}/>
                </div>              
                <div className="flex items-center justify-center px-4 py-1 mr-24">
                   <DashboardTable data={myBids} showHeader={true}/>
                </div>
                <div className="flex items-center justify-center px-4 py-1 ml-24">
                    <SimpleList title={"Recent Missions"}  data={recentMissions} type={'mission'}/>
                </div> 
                <div className=" flex items-center justify-center px-4 py-1 mr-24">
                    <SimpleList title={"Applications"} data={applications} type={'application'}/>
                </div> 
            </div>
            </div>
        </div>
  );
};


export default DashboardCompany;