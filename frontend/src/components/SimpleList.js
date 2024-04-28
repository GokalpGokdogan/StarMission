import React, { useState, useEffect } from "react";
import SinglePastMission from './SinglePastMission'
import { getPastMissions } from '../Requests';

const SimpleList = ({title, data}) =>{
    return (
        <div>
            <ul className="flex-auto flex-col flex p-4 border rounded-xl border-transparent border-10 bg-grey-bg shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-main-text font-semibold px-2 mb-4">{title}</h2>
                </div>
                {data.map(value => (
                    <SinglePastMission title={value.name} location={value.location}/>
                ))}
            </ul>
        </div>
    )
};

export default SimpleList