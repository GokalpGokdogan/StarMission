import React, { useState } from 'react';
import MissionItem from '../../components/MissionItem';
import SearchBar from '../../components/SearchBar';

const LeadingMissions = () => {

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Leading Missions</p>
        </div>
        <div class="flex justify-center mt-6 mb-12">
          <SearchBar input="INPUT"/>
        </div>
        <div>
            <MissionItem title="Space Discovery" company="NASA" location="Washington DC, United States"/>
            <MissionItem title="Asteroid Ceres" company="NASA" location="Washington DC, United States"/>
            <MissionItem title="Mesosphere AIM" company="NASA" location="Washington DC, United States"/>
            <MissionItem title="Finding Water in Mars" company="NASA" location="Washington DC, United States"/>
            <MissionItem title="Operation GT" company="NASA" location="Texas, USA"/>
            <MissionItem title="Hedef Uzay 2024" company="Tübitak" location="Ankara, Turkey"/>
        </div>
    </div>
  );
};

export default LeadingMissions;