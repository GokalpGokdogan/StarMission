import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import BidModal from '../../components/BidModal';
import { getMissionData, getApplicationsAstro } from '../../Requests';
import { applyToMission } from '../../Requests';
import Header from '../../components/Header';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from '@mui/material/CircularProgress';

//Kodun indentationı bozuk, daha sonra düzeltilsin!!!!
const MissionDetailsAstronaut = () => {
  const { missionId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isAppliedBefore, setIsAppliedBefore] = useState(false);
  const [missionData, setMissionData] = useState({});
  const [applications, setApplications] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMissionData = async () => {
    try{
        const mission = await getMissionData(missionId);

        setMissionData(mission);
        console.log(mission);           
    } catch (error){
        console.error('Error fetching apps:', error);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
};

const fetchApplications = async () => {
  try{
    const apps = await getApplicationsAstro();

    setApplications(apps);

    for(var i = 0; i < apps.length; i++){
      if(apps[i].mission_id == missionId && apps[i].application_status == "Processing"){
        setIsAppliedBefore(true);
      }
    }     
  } catch (error){
      console.error('Error fetching apps:', error);
  }
};

const handleApplyToMission = async () => {
  try{
    await applyToMission(missionData.mission_id, coverletter);
    //resetInputFields();
    setShowModal(false);
    setAlertText('Application successful! Redirecting to mission postings...');
    setShowAlert(true);
    setTimeout(() => {
        window.location.href = '/mission-postings';
    }, 2000);
    //redirect here
  } catch (error) {
    if (error.response && error.response.status) {
      const status = error.response.status;

      if (status === 409) {
        setShowModal(false);
        setAlertText('You can not apply since you are already in another mission!');
        setShowAlert(true);
      }
      else{
        console.error(`Error applying to mission:`, error);  
      }    
    }
    else{
      console.error(`Error applying to mission:`, error); 
    }
  }
}

useEffect(() => {
  fetchApplications();
}, []);

useEffect(() => {
  fetchMissionData();
}, []);


  const currentPath = window.location.pathname;
  console.log(currentPath);
  const [searchText, setSearchText] = useState('');
  const [coverletter, setCoverletter] = useState('');
  const [showCoverletterPlaceholder, setShowCoverletterPlaceholder] = useState(true);

  const handleCoverletterChange = (e) => {
    setCoverletter(e.target.value);
    setShowCoverletterPlaceholder(e.target.value === '');
  };

  const formatDate = (date) => {
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();
  
    if(day < 10){
      day = "0" + day;
    }
  
    if(month < 10){
      month = "0" + month;
    }
  
    return day + "." + month + "." + year;
  }
  

  return (
    <Fragment>
    <div className="bg-home-bg min-h-screen">
      <Header title={"View Mission"}/>
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
        <div className="text-center mt-32">
          <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
          <p>Loading data...</p>
        </div>
      </div>
      ) : (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '700px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">{missionData.name}</h2>
            <div className="flex items-center ml-8 mt-8">
              <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
              <div>
                <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{missionData.company_name}</p>
                <p className="truncate text-base font-medium leading-5 text-sub-text">{missionData.location}</p>
                <p className="break-all text-sm font-medium leading-5 text-sub-text">Mission Start-End: {formatDate(missionData.start_date)} - {formatDate(missionData.end_date)}</p>
              </div>
            </div>
            {missionData.partner_firms && missionData.partner_firms.length > 0 && (
                <>
                  <h2 className="text-sm font-bold text-main-text mt-1 ml-8">Partners</h2>
                  <div className="flex flex-col ml-8 mr-8 w-128 rounded-xl">
                    <p className="text-sm font-semibold leading-5 mb-1 ml-3 mr-3 text-main-text">
                      <ul className="list-disc list-inside">
                        {missionData.partner_firms.map((partner, index) => (
                          <li key={index} className="text-sm">{partner}</li>
                        ))}
                      </ul>
                    </p>
                  </div>
                </>
              )}
            <div className="flex flex-col px-1 py-1 ml-8 mr-8 mt-8 mb-4 w-128 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 ml-3 mr-3 mt-3 text-sub-text">{missionData.description}</p>
            </div>
            <h2 className="text-xl font-bold text-main-text mt-4 ml-8">Important Notes</h2>
            <div className="flex flex-col px-1 py-1 ml-8 mr-8 mt-2 w-128 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 mb-1 mt-1 ml-3 mr-3 text-sub-text">
              <ul className="list-disc list-inside">
                   {missionData.important_notes?.map((note, index) => (
                      <li key={index} className="text-sm">{note}</li>
                    ))}
                </ul>
              </p>
            </div>
            { isAppliedBefore ?
                (
                <div className="flex mt-16 justify-center">
                  <p>You have already applied for this mission!</p>
                </div>
                )               
            : ( currentPath !== `/astronaut-past-mission-details/${missionData.mission_id}/` &&
            <div className="flex justify-end mr-8 mt-16 mb-4 z-50">
            <button type="button" className="w-auto bg-button-purple text-white text-sm px-2 py-3 rounded-xl" onClick={() => setShowModal(true)}>
            Apply to Mission
            </button>
          
          <BidModal isVisible={showModal} onClose={() => setShowModal(false)}>  
                <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">Apply to {missionData.name}</h2>
                <div className="flex items-center ml-8 mt-8">
                <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
                <div>
                  <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{missionData.company_name}</p>
                  <p className="truncate text-base leading-5 text-sub-text">{missionData.location}</p>
                  <p className="truncate text-sm leading-5 text-sub-text">Mission Start-End: {formatDate(missionData.start_date)} - {formatDate(missionData.end_date)}</p>
                </div>
              </div>
              
              <h2 className="text-sm font-bold text-main-text mt-4 ml-8">Submit your cover letter</h2>
              <textarea
                name="coverletter"
                placeholder="Enter cover letter"
                value={coverletter}
                onChange={handleCoverletterChange}
                className="flex flex-col border bg-grey-bg w-128 h-32 rounded-lg p-2 mb-4 ml-8 mr-8 resize-none" // Removed height and added resize-none
                row={3}// Initial number of rows
              />
             
             <div className="flex justify-end mr-8 mb-4">
             <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl ml-4" onClick={() => handleApplyToMission()}>
                Apply
              </button>
            </div>
          </BidModal>
        </div>
            
            )}
            
          </div>
        </div>
      </div>)}
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
    </Fragment>
    
  );
};

export default MissionDetailsAstronaut;
