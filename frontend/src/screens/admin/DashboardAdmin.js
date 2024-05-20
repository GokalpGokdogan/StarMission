import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { createViews } from "../../Requests";
import CreateReport from "./CreateReport";
import { NavLink } from "react-router-dom";
import Header from '../../components/Header';
import { useUser } from "../../UserProvider";

const DashboardAdmin = () => {
    const {userId} = useUser();

    const createView = async () => {
        try{
            const apps = await createViews();
            if(apps == "No applications found with these filters")
            {
              console.log("ahah")
            }
            else
            {
              console.log(apps);
            }
            
        } catch (error){
            console.error('Error fetching apps:', error);
        }
    };
    
    useEffect(() => {
      createView();
    }, []);

    return (
        <div className="bg-home-bg h-full">
        <Header title={"Admin Panel"}/>
        <div className="flex justify-center items-center mt-64">
            <div className='flex flex-row gap-4'>
                <NavLink
                    to={'/create-report'}
                    className={`bg-indigo-700 text-white text-sm py-10 px-4 rounded-xl hover:bg-button-purple flex justify-center`}
                >
                    Create Report
                </NavLink>
                <NavLink
                    to={'/reports'}
                    className={`bg-indigo-700 text-white text-sm py-10 px-4 rounded-xl hover:bg-button-purple flex justify-center`}
                >
                    View Reports
                </NavLink>
            </div>
        </div>
      </div>
    )
}

export default DashboardAdmin