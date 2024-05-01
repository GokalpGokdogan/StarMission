import React, { useState, useEffect } from 'react';
import MissionItem from '../../components/MissionItem';
import SearchBar from '../../components/SearchBar';
import { getLeadingMissions } from '../../Requests';
import { useUser } from '../../UserProvider';


const LeadingMissions = () => {

  const {userId} = useUser();
  const [leadingMissions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
        try{
            const missions = await getLeadingMissions(userId);
            if(missions === "No missions found with these filters")
            {
              console.log("ahah")
            }
            else
            {
              setMissions(missions);
              console.log(missions);
            }
            
        } catch (error){
            console.error('Error fetching missions:', error);
        }
    };

    fetchMissions();
}, []);

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Leading Missions</p>
        </div>
        <div class="flex justify-center mt-6 mb-12">
          <SearchBar input="INPUT"/>
        </div>
        <div>
            {leadingMissions && leadingMissions.map(mission => (
              <MissionItem
                title={mission.name}
                location={mission.location}
              />
            ))}
        </div>
    </div>
  );
};

export default LeadingMissions;

