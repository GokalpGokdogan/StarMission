import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { createMission } from "../../Requests";
import CreateReport from "./CreateReport";
import { NavLink } from "react-router-dom";

const Reports = () => {

    return (
        <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
          <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Reports</p>
        </div>
        <div className='p-4'>
            <div className="flex flex-col flex-wrap">
                {/* {reports && reports.map(report => (
                    <p>{report.name}</p>
                ))}  */}
                </div>
          </div>
        </div>
    )
}

export default Reports