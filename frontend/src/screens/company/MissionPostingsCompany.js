import React, { useState } from 'react';
import MissionPost from '../../components/MissionPost'
import SearchBar from '../../components/SearchBar';

const MissionPostingsCompany = () => {

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Mission Postings</p>
        </div>
        <div class="flex justify-center mt-6 mb-12">
          <SearchBar input="INPUT"/>
        </div>
        <div>
            <MissionPost title="Space Discovery" company="NASA" location="Washington DC, United States" type="company"/>
            <MissionPost title="Asteroid Ceres" company="NASA" location="Washington DC, United States" type="company"/>
            <MissionPost title="Mesosphere AIM" company="NASA" location="Washington DC, United States" type="company"/>
            <MissionPost title="Finding Water in Mars" company="NASA" location="Washington DC, United States" type="company"/>
            <MissionPost title="Operation GT" company="NASA" location="Texas, USA" type="company"/>
            <MissionPost title="Hedef Uzay 2024" company="Tübitak" location="Ankara, Turkey" type="company"/>
        </div>
    </div>
  );
};

export default MissionPostingsCompany;