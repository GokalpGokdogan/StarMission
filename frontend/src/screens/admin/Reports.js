import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { getAllReports, deleteReport } from "../../Requests";
import CreateReport from "./CreateReport";
import { NavLink } from "react-router-dom";
import SinglePastMission from "../../components/SinglePastMission";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Header from '../../components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import { useUser } from "../../UserProvider";
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Reports = () => {

const [reports, setReports] = useState([]);
const {userId} = useUser();
const [loading, setLoading] = useState(true);
const [showAlert, setShowAlert] = useState(false);
const [alertText, setAlertText] = useState('');

  const fetchAllReports = async () => {
    try{
        const rep = await getAllReports(userId);

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
        console.error('Error fetching reports:', error);
    } finally{
      setTimeout(() => setLoading(false), 300);
    }
  };

  const handleDeleteReport = (value) => {
    try{
      deleteReport(value.report_id);

      setAlertText('Delete report successful!');
      setShowAlert(true);

      setTimeout(() => {
        window.location.reload();
    }, 2000);

    } catch (error){
      setAlertText('Error deleting the report!');
      setShowAlert(true);

      console.error("Error deleting the report", error);
    }
    
  }


  useEffect(() => {
    fetchAllReports();
  }, []);

    return (
        <div className="bg-home-bg h-full">
        <Header title={"Reports"}/>
        {loading ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center mt-32">
                <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
                <p>Loading data...</p>
              </div>
            </div>
          ) : (
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
                                <p className="text-xs leading-5 text-sub-text">{new Date(value.creation_date).toLocaleDateString('en-GB', {day: '2-digit',month: '2-digit',year: 'numeric'}).replace(/\//g, '.')}</p>
                            </div>
                            <div className="cursor-pointer duration-300 hover:scale-105 ease-in-out" onClick={() => handleDeleteReport(value)}><DeleteOutlineIcon style={{ color: '#FF3B30'}}></DeleteOutlineIcon></div>
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
          </div>)}
          {showAlert && (
            <div className={`fixed bottom-4 right-4 max-w-96 flex ${alertText.length > 40 ? 'flex-col items-end justify-center' : 'flex-row items-center'}`}>
              <Alert severity={alertText.includes('successful') ? 'success' : 'error'} className="w-full">
                <div className="flex items-center justify-between w-full">
                  <div>{alertText}</div>
                  <IconButton onClick={() => setShowAlert(false)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </Alert>
            </div>
          )}
        </div>
    )
}

export default Reports