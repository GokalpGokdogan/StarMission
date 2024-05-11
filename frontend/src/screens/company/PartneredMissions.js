import React, {useEffect, useState} from 'react';
import MissionItem from '../../components/MissionItem';
import SearchBar from '../../components/SearchBar';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {getPartnerMissions} from "../../Requests";
import { useUser } from '../../UserProvider';

const PartneredMissions = () => {
  const [missions, setMissions] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const {userId} = useUser();

  const fetchPartnerMissions = async () => {
  try {
      console.log(userId);
      const res = await getPartnerMissions(userId, null, null, null, null, null, null, null);
      setMissions(res);
    } catch (error) {
      console.error('Error fetching partner missions:', error);
    } finally {
      setTimeout(() => setInitialLoading(false), 300);
    }
  };

  useEffect(() => {
    fetchPartnerMissions();
  }, []);

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Partnered Missions</p>
        </div>
        <div className="flex justify-center mt-6 mb-12">
          <SearchBar/>
        </div>
        <div>            
            {missions && missions.length > 0 ? 
              (missions.map(mission => (
                <MissionItem
                  title={mission.title}
                  company={[mission.name]}
                  location={mission.location ? mission.location: "No location specified"}
                />
                ))) : (
                  <div className="flex justify-center w-[60%] h-[80%]">
                      <p className="text-3xl font-semibold leading-6 text-main-text mt-[30%]" >No data</p>
                  </div>
              )}
        </div>
    </div>
  );
};

export default PartneredMissions;