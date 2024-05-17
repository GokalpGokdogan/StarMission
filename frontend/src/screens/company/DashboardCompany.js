import React, { useState, useEffect } from 'react';
import {Link, Route, useNavigate} from 'react-router-dom';
import SimpleList from '../../components/SimpleList';
import ApplicationsTable from '../../components/ApplicationsTable';
import DashboardTable from '../../components/DashboardTable';
import { getLeadingMissions, getApplications, getMyBids, getMissionPostings, logout } from '../../Requests';
import { useUser } from '../../UserProvider';
import Header from '../../components/Header';
import CircularProgress from '@mui/material/CircularProgress';


//PASTMISSIONS COMPONENT SHRINKS IN EMPTY DATA ARRAY!!!!!!!!!!!!!

const DashboardCompany = () => {

  const {userId} = useUser();
  const [leadingMissions, setLeadingMissions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [recentMissions, setRecentMissions] = useState([]);
  const navigate = useNavigate();
  const {setUserType} = useUser();
  const {setUserId} = useUser();
  const [loading, setLoading] = useState(true);

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
    } finally {
      setTimeout(() => setLoading(false), 300);
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
  } finally {
    setTimeout(() => setLoading(false), 300);
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
    } finally {
      setTimeout(() => setLoading(false), 300);
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
      } finally {
        setTimeout(() => setLoading(false), 300);
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
            <Header title={"Dashboard"}/>
            {loading ? (
              <div className="flex-grow flex items-center justify-center">
              <div className="text-center mt-32">
                <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
                <p>Loading data...</p>
              </div>
            </div>
            ) : (
            <div className='p-4'>
              <div className="grid grid-cols-2 grid-rows-2 mt-4">
                  <div className="flex items-center justify-center px-4 py-1 ml-24">
                    <SimpleList title={"Leading Missions"} data={leadingMissions} type={'mission'}/>
                  </div>              
                  <div className="flex items-center justify-center px-4 py-1 mr-24">
                    <DashboardTable data={myBids} showHeader={true} searchText={''}/>
                  </div>
                  <div className="flex items-center justify-center px-4 py-1 ml-24">
                    <SimpleList title={"Recent Missions"}  data={recentMissions} type={'mission'}/>
                  </div> 
                  <div className=" flex items-center justify-center px-4 py-1 mr-24">
                    <SimpleList title={"Applications"} data={applications} type={'application'}/>
                  </div> 
              </div>
            </div>)}
        </div>
  );
};


export default DashboardCompany;