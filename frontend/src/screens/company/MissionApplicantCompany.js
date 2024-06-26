import React, {useEffect, useState} from 'react';
import MissionApplicant from "../../components/MissionApplicant";
import {useParams} from "react-router-dom";
import {getApplicationData} from "../../Requests";
import Header from '../../components/Header';
import { getImageById } from '../../Requests';

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
    <div className="bg-home-bg h-full min-h-screen flex flex-col">
        <Header title={"Application to " + applicationData.mission_name}/>
        <div className="flex flex-grow justify-center items-center">
            <MissionApplicant application={applicationData}/>
        </div>
    </div>

    );
};

export default MissionApplicantCompany;