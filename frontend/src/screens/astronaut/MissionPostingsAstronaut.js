import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import MissionPost from '../../components/MissionPost';
import SearchBar from '../../components/SearchBar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getRecentMissions } from '../../Requests';
import { useUser } from '../../UserProvider';


const MissionPostingsAstronaut = () => {

  const {userId} = useUser();
  const [recentMissions, setRecentMissions] = useState([]);

  const fetchRecentMissions = async () => {
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
                title={post.mission_name}
                company={post.name}
                location={post.location}
                id={post.mission_id}
                type="astronaut"
              />
            ))}
        </div>
    </div>
  );
};

export default MissionPostingsAstronaut;
