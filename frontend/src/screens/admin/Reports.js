import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { getAllReports } from "../../Requests";
import CreateReport from "./CreateReport";
import { NavLink } from "react-router-dom";
import SinglePastMission from "../../components/SinglePastMission";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Reports = () => {

const [reports, setReports] = useState([]);

  const fetchAllReports = async () => {
    try{
        const rep = await getAllReports(2);
        if(rep === "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setReports(rep);
          console.log(rep);
        }
        
    } catch (error){
        console.error('Error fetching missions:', error);
    }
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

    return (
        <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
          <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Reports</p>
        </div>
        <div className='p-4'>
            <div className="flex flex-col flex-wrap">
            <div className="w-full">
                {reports && reports.length > 0 ? (
                    reports.map(value => (
                      <li className="flex justify-between py-1 px-2">
                      <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white">
                          <div className="min-w-0 flex-auto">
                            {/*   <p className="text-sm font-semibold leading-6 text-main-text">{value.name}</p> */}
                            <NavLink
                                to={`/report-details/${value.report_id}`}
                                className="text-sm font-semibold leading-6 text-main-text"
                            >{value.name}</NavLink>
                              <p className="truncate text-xs leading-5 text-sub-text">{new Date(value.creation_date).toLocaleDateString('en-GB', {day: '2-digit',month: '2-digit',year: 'numeric'}).replace(/\//g, '.')}</p>
                          </div>
                          <div><DeleteOutlineIcon style={{ color: '#FF3B30'}}></DeleteOutlineIcon></div>
                      </div>
                  </li>
                    )) 
                ) : (
                    <div className="flex justify-center w-full h-full my-auto">
                        <p className="text-xl font-semibold leading-6 text-main-text my-auto" >No data</p>
                    </div>
                )}  
        </div>
                </div>
          </div>
        </div>
    )
}

export default Reports