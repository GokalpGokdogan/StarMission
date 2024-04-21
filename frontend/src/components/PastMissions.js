import React, { useState, useEffect } from "react";
import SinglePastMission from './SinglePastMission'
import { getPastMissions } from '../Requests';



const missions = [
    {
        title: 'DDO Research',
        location: 'Ankara, Turkey'
    },
    {
        title: 'Operation GT',
        location: 'Texas, USA'
    },
    {
        title: 'Finding Water in Mars',
        location: 'Mars'
    },
    {
        title: 'Space Discovery',
        location: 'Andromeda Galaxy'
    },
]; 
const PastMissions = () =>{
    return (
        <div>
            <ul className="flex-auto flex-col flex p-4 border rounded-xl border-transparent border-10 bg-grey-bg shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-main-text font-semibold px-2 mb-4">Past Missions</h2>
                </div>
                {missions.map(mission => (
                    <SinglePastMission title={mission.title} location={mission.location}/>
                ))}
            </ul>
        </div>
    )
};

export default PastMissions