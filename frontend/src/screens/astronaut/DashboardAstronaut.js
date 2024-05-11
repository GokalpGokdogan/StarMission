import React, { useState, useEffect } from 'react';
import SimpleList from '../../components/SimpleList';
import DashboardTable from '../../components/DashboardTable';
import { useUser } from '../../UserProvider';
import { getCurrentMission, getPastMissions, getApplicationsAstro, getRecentMissions } from '../../Requests';


const DashboardAstronaut = () => {


        const {userId} = useUser();
        const [mission, setMission] = useState([]);
        const [applications, setApplications] = useState([]);
        const [recentMissions, setRecentMissions] = useState([]);
        const [pastMissions, setPastMissions] = useState([]);
      
        const fetchRecentApplications = async () => {
          try{
              const mission = await getRecentMissions();
              if(mission == "No applications found with these filters")
              {
                console.log("ahah")
              }
              else
              {
                setRecentMissions(mission);
                console.log("Recent Applications");
                console.log(mission);
              }
              
          } catch (error){
              console.error('Error fetching apps:', error);
          }
        };
      
      const fetchPastMissions = async () => {
        try{
            const mission = await getPastMissions();
            if(mission == "No applications found with these filters")
            {
              console.log("ahah")
            }
            else
            {
                setPastMissions(mission);
                console.log("Past Missions");
                console.log(mission);
            }
            
        } catch (error){
            console.error('Error fetching missions:', error);
        }
      };
      
      
        const fetchCurrentMission = async () => {
          try{
              const mission = await getCurrentMission();
              if(mission == "No applications found with these filters")
              {
                console.log("ahah")
              }
              else
              {
                setMission(mission);
                console.log("Current Mission");
                console.log(mission);
              }
              
          } catch (error){
              console.error('Error fetching apps:', error);
          }
      };
      
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
            fetchCurrentMission();
            fetchApplications();
            fetchPastMissions();
            fetchRecentApplications();
        }, []);
      
        return (
              <div className="bg-home-bg h-full">
                  <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
                      <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Dashboard</p>
                  </div>
                  <div className='p-4'>
                  <div className="grid grid-cols-2 grid-rows-2 mt-12">
                      <div className="flex items-center justify-center px-4 py-1 ml-24">
                          <SimpleList title={"Current Mission"} data={mission} type={'mission'}/>
                      </div>              
                      <div className="flex items-center justify-center px-4 py-1 mr-24">
                         <DashboardTable data={applications} showHeader={true}/>
                      </div>
                      <div className="flex items-center justify-center px-4 py-1 ml-24">
                          <SimpleList title={"Past Missions"}  data={pastMissions} type={'mission'}/>
                      </div> 
                      <div className=" flex items-center justify-center px-4 py-1 mr-24">
                          <SimpleList title={"Recent Missions"} data={recentMissions} type={'application'}/>
                      </div> 
                  </div>
                  </div>
              </div>
        );
      };


export default DashboardAstronaut;