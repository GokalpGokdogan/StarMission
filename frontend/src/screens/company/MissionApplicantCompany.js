import React, {useEffect, useState} from 'react';
import MissionApplicant from "../../components/MissionApplicant";
import {useParams} from "react-router-dom";
import {getApplicationData} from "../../Requests";


const MissionApplicantCompany = () => {
    const { astronautId, missionId, appliedDate } = useParams();
    const [applicationData, setApplicationData] = useState({});

    const fetchApplicationData = async () => {
        try{
            const app = await getApplicationData(astronautId, missionId, appliedDate);
            if(app === "No applications found with these filters")
            {
                console.log("ahah")
            }
            else
            {
                setApplicationData(app);
                console.log(app);
            }

        } catch (error){
            console.error('Error fetching apps:', error);
        }
    };

    useEffect(() => {
        fetchApplicationData();
    }, []);

    return (
        <div className="bg-home-bg h-full">
            <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
                <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Application</p>
            </div>
            <div>
                <MissionApplicant application={applicationData}/>
            </div>
        </div>
    );
};

export default MissionApplicantCompany;