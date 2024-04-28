import React, { useState, useEffect } from "react";
import SinglePastMission from './SinglePastMission'
import { getPastMissions } from '../Requests';

const SimpleList = ({title, data, type}) =>{
    return (
        <div>
            <ul className="flex-auto flex-col flex p-4 border rounded-xl border-transparent border-10 bg-grey-bg shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-main-text font-semibold px-2 mb-4">{title}</h2>
                </div>
                {type === 'mission' ? (
                    data.map(value => (
                        <SinglePastMission key={value.id} title={value.name} location={value.location} />
                    ))
                ) : (
                    data.map(value => (
                        <SinglePastMission key={value.id} title={value.astronaut_name} location={value.name} />
                    ))
                )}
            </ul>
        </div>
    )
};

export default SimpleList