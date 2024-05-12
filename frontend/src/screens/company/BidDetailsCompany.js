import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { getBidData } from '../../Requests';


const BidDetailsCompany = () => {

  const { bidId } = useParams();
  const [bidData, setBidData] = useState({});

  const fetchBidData = async () => {
    try {
      const bid = await getBidData(bidId);
      if (bid === "No bid data found with these filters") {
        console.log("No bid data found");
      } else {
        setBidData(bidId);
      }
    } catch (error) {
      console.error('Error fetching bid data:', error);
    }
  };

  useEffect(() => {
    fetchBidData();
  }, [bidId]);

 const BidData = {
    name: 'Missionların missioni',
    company_name: 'Dogacompany',
    amount: "10.000",
    description: 'ted States, Washington DCUnington DCUninited States, Washington DCUninited States, Washington DCUnies, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DCUnited States, Washington DC',
    bidDate: '07.02.2024',
 }

  return (
      <div className="bg-home-bg min-h-screen">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
          <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>View Bid</p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
            <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
              <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">{bid.name}</h2>
              <div className="flex items-center ml-8 mt-8">
                <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
                <div>
                  <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{bid.company_name}</p>
                  <p className="truncate text-sm leading-5 mt-1 text-sub-text">Bid on {bid.bidDate}</p>
                </div>
              </div>
              <p className="text-xl font-semibold leading-5 mt-12 ml-10 mr-3 text-main-text">Requested Amount:</p>
              <div className="px-1 py-5 ml-8 mr-8 mt-4 mb-4 items-center bg-grey-bg rounded-xl">
                <p className="text-xl font-semibold leading-5 ml-3 mr-3 text-main-text">${bid.amount}</p>
              </div>
              <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Offer Description</p>
              <div className="flex flex-col px-1 py-5 mt-4 ml-8 mr-8 mb-4 w-128 bg-grey-bg rounded-xl">
                <p className="text-sm font-semibold leading-5 ml-3 mr-3 text-sub-text">{bid.description}</p>
              </div>

              <div className="flex justify-end mr-8 mt-16 mb-4">
                <button type="button" className="w-32 mr-2 bg-button-red text-white text-sm px-1 py-3 rounded-xl" >
                  Reject
                </button>
                <button type="button" className="w-32 ml-2  bg-button-green text-white text-sm px-1 py-3 rounded-xl" >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BidDetailsCompany;
