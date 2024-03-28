import React from "react";
import SinglePastMission from './SinglePastMission'
const PastMissions = () =>{
    return (
        <div>
            <ul className="flex-auto flex-col flex min-w-0 p-4 border rounded-xl border-transparent border-10 bg-grey-bg shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-main-text font-semibold px-2 mb-4">Past Missions</h2>
                </div>
                <SinglePastMission title="DDO Research" location="Ankara, Turkey"/>
                <SinglePastMission title="Operation GT" location="Texas, USA"/>
                <SinglePastMission title="Finding Water in Mars" location="Mars"/>
            </ul>
        </div>
    )
};

export default PastMissions