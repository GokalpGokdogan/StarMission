import {React, useState} from 'react'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { leaveCurrentMission } from '../Requests';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CurrentMission = ({ missionData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const formattedStart = new Date(missionData.start_date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  const formattedEnd = new Date(missionData.end_date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  const handleLeaveCurrentMission = () => {
    try{
      leaveCurrentMission(missionData.mission_id);

      setAlertText('Leave current mission successful!');
      setShowAlert(true);

      setTimeout(() => {
        window.location.reload();
    }, 2000);

    } catch (error){
      if (error.response && error.response.status && error.response.status === 401) {
        setAlertText('Astranaut not authorized!');
        setShowAlert(true);
      }
      else{
        setAlertText('Unknown error!');
        setShowAlert(true);
      }
      console.error("Error leaving the mission", error);
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col p-4 rounded-xl bg-grey-bg shadow-lg min-h-72">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-main-text font-semibold px-2 mb-4">Current Mission</h2>
        </div>
       {missionData ? ( <div className="flex flex-col rounded-xl bg-white p-4">
          <div className="flex justify-between mr-8 mb-4">
            <h2 className="text-2xl font-bold text-main-text ml-4">{missionData.name}</h2>
            <button type="button" className="w-32 bg-button-red text-white text-sm px-2 py-3 rounded-xl ml-4" onClick={() => {handleLeaveCurrentMission();}}>
              Leave
            </button>
          </div>
          <div className="flex items-center mt-4">
            <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
            <div className='flex-1 ml-4 py-2'>
              <p className="text-lg font-semibold text-main-text">{missionData.company_name}</p>
              <p className="truncate text-base font-medium text-sub-text">{missionData.location}</p>
              <p className="break-all text-sm font-medium text-sub-text">{formattedStart} - {formattedEnd}</p>
              <div className='flex flex-row'><AttachMoneyIcon  style={{ marginLeft:'-4px', marginRight:'-2px', color: '#25854e', fontSize: '20px' }}/><p className="break-all text-sm font-medium text-sub-text text-main-bg">{missionData.salary}</p></div>
            </div>
          </div>
          <div className="flex flex-col px-4 py-5 mt-4 mb-4 bg-grey-bg rounded-xl">
            <p className="text-sm font-semibold text-sub-text">{missionData.description}</p>
          </div>

          {missionData.important_notes && missionData.important_notes.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-main-text mt-4 ml-4">Important Notes</h2>
              <div className="flex flex-col px-4 py-2 mt-2 bg-grey-bg rounded-xl text-sub-text font-semibold">
                <ul className="list-disc list-inside">
                    <li className="text-sm">{missionData.important_notes[0]}</li>
                </ul>
              </div>
            </>
          )}
        </div>) 
        : (
            <div className="flex justify-center w-full h-full my-auto">
                <p className="text-xl font-semibold leading-6 text-main-text my-auto" >No data</p>
            </div>
        )}
      </div>
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

export default CurrentMission