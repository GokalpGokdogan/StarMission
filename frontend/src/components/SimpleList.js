import React, { useState, useEffect } from "react";
import SinglePastMission from './SinglePastMission'
import { getPastMissions } from '../Requests';

const SimpleList = ({ title, data, type }) => {
    return (
        <div className="w-full">
            <ul className="flex-auto flex-col flex p-4 border rounded-xl border-transparent border-10 bg-grey-bg shadow-lg px-4 h-72">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-main-text font-semibold px-2 mb-4">{title}</h2>
                </div>
                {data && data.length > 0 ? (
                    type === 'mission' ? (
                        data.slice(0, Math.min(3, data.length)).map(value => (
                            <SinglePastMission key={value.id} title={value.name} location={value.location} />
                        ))
                    ) : (
                        data.slice(0, Math.min(3, data.length)).map(value => (
                            <SinglePastMission key={value.id} title={value.astronaut_name} location={value.name} />
                        ))
                    )
                ) : (
                    <p>No data</p>
                )}
            </ul>
        </div>
    )
};

export default SimpleList