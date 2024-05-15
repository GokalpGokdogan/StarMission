import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { createViews } from "../../Requests";
import CreateReport from "./CreateReport";
import { NavLink } from "react-router-dom";
import Header from '../../components/Header';

const DashboardAdmin = () => {

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

        <div className='p-4'>
            <NavLink
                to={'/create-report'}
                className={`w-28 bg-button-purple text-white text-sm py-2 rounded-xl hover:bg-indigo-700 flex justify-center`}
            >
                Create Report
            </NavLink>
            <NavLink
                to={'/reports'}
                className={`w-28 mt-4 bg-button-purple text-white text-sm py-2 rounded-xl hover:bg-indigo-700 flex justify-center`}
            >
                View Reports
            </NavLink>
        </div>
      </div>
    )
}

export default DashboardAdmin