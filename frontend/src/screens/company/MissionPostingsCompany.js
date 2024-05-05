import React, { useEffect, useState } from 'react';
import MissionPost from '../../components/MissionPost'
import SearchBar from '../../components/SearchBar';
import { getMissionPostings } from '../../Requests';
import { useUser } from '../../UserProvider';

const MissionPostingsCompany = () => {

  const {userId} = useUser();
  const [recentMissions, setRecentMissions] = useState([]);

  const fetchRecentMissions = async () => {
    try{
        const miss = await getMissionPostings(userId);
        if(miss === "No applications found with these filters")
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

  useEffect(() => {
    fetchRecentMissions();
}, []);

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Mission Postings</p>
        </div>
        <div class="flex justify-center mt-6 mb-12">
          <SearchBar/>
        </div>
        <div>
          {recentMissions.map(post => (
              <MissionPost
                key={post.key}
                title={post.name}
                company={post.company_name}
                location={post.location}
                id={post.mission_id}
                type="company"
              />
            ))}
        </div>
    </div>
  );
};

export default MissionPostingsCompany;