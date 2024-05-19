import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { getBidData, rejectIncomingBid, acceptIncomingBid, getImageById, getCompanyData} from '../../Requests';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from '../../UserProvider';
import Header from '../../components/Header';
import { Avatar } from '@mui/material';

const BidDetailsCompany = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const { bidId } = useParams();
  const [bidData, setBidData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [url, setUrl] = useState(''); 
  const {userId} = useUser();

  const fetchImage = async () => {
        try{
      const mis = await getImageById(bidData.bidding_company_id);
          setUrl(mis);
          console.log(mis);      
      } catch (error){
          console.error('Error fetching missions:', error);
      } 
     
  }

  useEffect(() => {
     fetchImage();
     fetchCompanyData();
  }, [bidData]);


  const fetchBidData = async () => {
    try {
      const bid = await getBidData(bidId);
      if (bid === "No bid data found with these filters") {
        console.log("No bid data found");
      } else {
        setBidData(bid);
      }
    } catch (error) {
      console.error('Error fetching bid data:', error);
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

  const handleRejectIncomingBid = async () => {
    try{
        const app = await rejectIncomingBid(bidId);
        
        setAlertText('Reject incoming bid successful! Redirecting to the mission...');
        setShowAlert(true);
        const redirectUrl = `/leading-mission-details/${bidData.mission_id}`;
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 2000);

    } catch (error){
        console.error('Error rejecting the incoming bid:', error);
    }
};

const handleAcceptIncomingBid = async () => {
  console.log(userId);
  try{
      await acceptIncomingBid(userId, bidId);
      
      setAlertText('Accept incoming bid successful! Redirecting to the mission...');
      setShowAlert(true);
      const redirectUrl = `/leading-mission-details/${bidData.mission_id}`;
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000);
  } catch (error){
    console.error(`Error applying to mission:`, error);
    if (error.response && error.response.status) {
      const status = error.response.status;

      if (status === 409) {
        setAlertText('Balance is not enough to accept the bid!');
      }
      else if(status === 401){
        setAlertText('This bid is invalid at the moment!');
      }
      else {
        setAlertText('An unexpected error occurred. Please try again.');
      }
    } else {
      setAlertText('An unknown error occurred. Please try again.');
    }
    
    setShowAlert(true);
  }
};

  useEffect(() => {
    fetchBidData();
  }, [bidId]);

  return (
      <div className="bg-home-bg min-h-screen">
        <Header title={"View Bid"}/>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
            <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
              <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">{bidData.mission_name}</h2>
              <div className="flex items-center ml-8 mt-8">
              <Avatar sx={{height: 56, width: 56}} alt="Remy Sharp" src={url} className="mr-4"/> 
                <div>
                  <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{bidData.company_name}</p>
                  <p className="truncate text-sm leading-5 mt-1 text-sub-text">Bid on {bidData.bid_date}</p>
                </div>
              </div>
              <p className="text-xl font-semibold leading-5 mt-12 ml-10 mr-3 text-main-text">Requested Amount:</p>
              <div className="px-1 py-5 ml-8 mr-8 mt-4 items-center bg-grey-bg rounded-xl">
                <p className="text-xl font-semibold leading-5 ml-3 mr-3 text-main-text">${bidData.requested_amount}</p>
              </div>
              <h2 className="text-sm font-bold bg-bid-money p-1 w-64 border text-main-text ml-8">Current balance: ${companyData.balance}</h2>
              <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Offer Description</p>
              <div className="flex flex-col px-1 py-5 mt-4 ml-8 mr-8 mb-4 w-128 bg-grey-bg rounded-xl">
                <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{bidData.description}</p>
              </div>
              <div className="flex justify-end mr-8 mt-16 mb-4">
                <button type="button" className="w-32 mr-2 bg-button-red text-white text-sm px-1 py-3 rounded-xl"
                  onClick={handleRejectIncomingBid}>
                  Reject
                </button>
                <button type="button" className="w-32 ml-2  bg-button-green text-white text-sm px-1 py-3 rounded-xl"
                  onClick={handleAcceptIncomingBid}>
                  Accept
                </button>
              </div>
            </div>
          </div>
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
  );
};

export default BidDetailsCompany;
