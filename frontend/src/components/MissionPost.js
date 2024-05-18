import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { getImageByName } from "../Requests";
import { Avatar } from "@mui/material";

const MissionPost = ({title, company, location, type, id}) => {

    const [url, setUrl] = useState(''); 

    const fetchImage = async () => {
        try{
            const mis = await getImageByName(company);

            setUrl(mis);
            console.log(mis);      
        } catch (error){
            console.error('Error fetching missions:', error);
        } 
    }

    useEffect(() => {
        fetchImage();
      }, []);

    return (
        <li className="flex py-1 px-2">
            <div className="flex" style={{ width : "654px" }}>
            <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white shadow-md">
                <div className="flex items-center">
                    <Avatar sx={{height: 32, width: 32}} alt="Remy Sharp" src={url} className="mr-2"/> 
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-main-text">{title}</p>
                    <p className="truncate text-xs font-semibold leading-5 text-sub-text">{company}</p>
                    <p className="truncate text-xs leading-5 text-sub-text">{location}</p>
                </div>
                <div className="flex items-center justify-center mb-2 mt-2 mr-2">
                    <NavLink
                        to={type === "astronaut" ? `/apply/${id}` : `/mission-details/${id}/${type}`}
                        className={`w-28 bg-button-purple text-white text-sm py-2 rounded-xl hover:bg-indigo-700 flex justify-center`}
                    >
                        {type === "astronaut" ? "Apply" : "View Details"}
                    </NavLink>
                </div>
            </div>
            </div>
        </li>
    )
};

export default MissionPost