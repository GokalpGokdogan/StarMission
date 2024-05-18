import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import BidModal from '../../components/BidModal';
import { getMissionData, getCompanyData, bidToMission, getMyBids, getImageById } from '../../Requests';
import { useUser } from '../../UserProvider';
import Header from '../../components/Header';
import { DateRange } from 'react-date-range';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar } from '@mui/material';

//Kodun indentationı bozuk, daha sonra düzeltilsin!!!!
const MissionDetailsCompany = () => {
  const {userId} = useUser();
  const { missionId } = useParams();
  const {type} = useParams();
  const [missionData, setMissionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [isBidBefore, setIsBidBefore] = useState(false);
  const [url, setUrl] = useState(''); 

  const fetchImage = async () => {
      try{
          const mis = await getImageById(missionData.leading_firm_id);

          setUrl(mis);
          console.log(mis);      
      } catch (error){
          console.error('Error fetching missions:', error);
      } 
  }

  useEffect(() => {
      fetchImage();
    }, [missionData]);

  const fetchBidData = async () => {
    try{
      const bids = await getMyBids(userId);
      console.log(bids);
      for(var i = 0; i < bids.length; i++){
        if(bids[i].mission_id == missionId && bids[i].bid_status == "In progress"){
          setIsBidBefore(true);
        }
      }     
    } catch (error){
      console.error('Error fetching bids:', error);
    }
  }

  const fetchMissionData = async () => {
    try{
        const mission = await getMissionData(missionId);
        if(mission == "No missions found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setMissionData(mission);
          console.log(mission);
        }
        
    } catch (error){
        console.error('Error fetching missions:', error);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
};

const fetchCompanyData = async () => {
  try{
      const companyData = await getCompanyData(userId);
      if(companyData == "No companies found with these filters")
      {
        console.log("ahah")
      }
      else
      {
        setCompanyData(companyData);
        console.log(companyData);
      }
      
  } catch (error){
      console.error('Error fetching companies:', error);
  }
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

 const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMissionData();
    fetchCompanyData();
    fetchBidData();
}, []);

  const [searchText, setSearchText] = useState('');
  const [amount, setAmount] = useState('');
  const [showAmountPlaceholder, setShowAmountPlaceholder] = useState(true);
  const [description, setDescription] = useState('');
  const [showDescriptionPlaceholder, setShowDescriptionPlaceholder] = useState(true);

  const handleAmountChange = (e) => {
    const newAmount = e.target.value === '' ? null : Math.max(0, parseFloat(e.target.value));

    setAmount(newAmount);
    setShowAmountPlaceholder(newAmount === '');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setShowDescriptionPlaceholder(e.target.value === '');
  };

  const resetInputFields = () => {
    setAmount('');
    setDescription('');
  };

  const handleBidToMission = async () => {
    if(amount > companyData.balance){
      setAlertText('Bid amount cannot exceed balance!');
      setShowAlert(true);
      return;
    }

    try{
      await bidToMission(userId, missionId, amount, description);
      
      resetInputFields();
      setShowModal(false);

      setAlertText('Bid successful! Redirecting to mission details...');
      setShowAlert(true);
      setTimeout(() => {
          window.location.href = '/company-mission-postings';
      }, 2000);
    } catch (error){
      console.error("Error bidding to the mission", error);
    } finally{
      resetInputFields();
      setShowModal(false);
    }
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
          <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
            <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
              <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">{missionData.name}</h2>
              <div className="flex items-center ml-8 mt-8">
{/*                 <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
 */}                
                <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={url} className='mr-4'/>

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
              <div className="flex flex-col px-1 py-5 ml-8 mr-8 mt-8 mb-4 w-128 bg-grey-bg rounded-xl">
                <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{missionData.description}</p>
              </div>
               {missionData.important_notes && missionData.important_notes.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-main-text mt-4 ml-8">Important Notes</h2>
                <div className="flex flex-col px-1 py-1 ml-8 mr-8 mt-2 w-128 bg-grey-bg rounded-xl">
                  <p className="text-sm font-semibold leading-5 mb-1 mt-1 ml-3 mr-3 text-sub-text">
                    <ul className="list-disc list-inside">
                      {missionData.important_notes.map((note, index) => (
                        <li key={index} className="text-sm">{note}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </>
              )}
              {!isBidBefore ? (<div className="flex justify-end mr-8 mt-16 mb-4">
              <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl" onClick={() => setShowModal(true)}>
                  Bid to Mission
                </button>
                 <BidModal isVisible={showModal} 
                  onClose={() => { 
                    setShowModal(false);
                    resetInputFields();
                  }}>
                  <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">Bid to {missionData.name}</h2>
                  <div className="flex items-center ml-8 mt-8">
                  <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={url} className='mr-4'/>
                    <div>
                      <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{missionData.company_name}</p>
                      <p className="truncate text-base leading-5 text-sub-text">{missionData.location}</p>
                      <p className="truncate text-sm leading-5 text-sub-text">Mission Start-End: {formatDate(missionData.start_date)} - {formatDate(missionData.end_date)}</p>
                    </div>
                  </div>

                  <h2 className="text-sm font-bold text-main-text mt-8 ml-8">Amount</h2>
                  <input
                    type="number"
                    min={0}
                    placeholder="Enter amount in dollars"
                    value={amount?.toString()}
                    onChange={handleAmountChange}
                    className="bg-transparent border border-gray-300 rounded-lg p-2 ml-8 mb-1 w-64"
                  /> 
                  <h2 className="text-sm font-bold bg-bid-money p-1 w-64 border text-main-text ml-8">Current balance: ${companyData.balance}</h2>
                  <h2 className="text-sm font-bold text-main-text mt-4 ml-8">Description</h2>
                  <textarea
                    type="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="flex flex-col border bg-grey-bg w-128 h-32 rounded-lg p-2 mb-4 ml-8 mr-8 resize-none" // Removed height and added resize-none
                    row={3}// Initial number of rows
                  />

                  <div className="flex justify-end mr-8 mb-4">
                    <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl" 
                    onClick={() => {
                      setShowModal(false);
                      resetInputFields();
                    }}
                    >
                      Close
                    </button>
                    <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl ml-4" 
                    onClick={() => {
                      handleBidToMission();
                    }}
                  >
                    Bid to Mission
                    </button>
                  </div>
                </BidModal> 
              </div>) : (
                  <div className="flex mt-16 justify-center">
                    <p>You already have a bid in progress for this mission!</p>
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
    </Fragment>
  );
};

export default MissionDetailsCompany;
