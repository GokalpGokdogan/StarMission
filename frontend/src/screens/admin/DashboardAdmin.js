import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { createMission } from "../../Requests";
import CreateReport from "./CreateReport";
import { NavLink } from "react-router-dom";

const DashboardAdmin = () => {

    

    return (
        <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
          <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Admin Panel</p>
        </div>
        <div className='p-4'>
            <NavLink
                to={'/create-report'}
                className={`w-28 bg-button-purple text-white text-sm py-2 rounded-xl hover:bg-indigo-700 flex justify-center`}
            >
                Create Report
            </NavLink>
        </div>
      </div>
    )
}

export default DashboardAdmin