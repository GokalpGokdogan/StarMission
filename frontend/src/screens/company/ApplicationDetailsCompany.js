import React, { Fragment, useState, useEffect } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import BidModal from '../../components/BidModal';
import { getMissionData } from '../../Requests';

const ApplicationDetailsCompany = () => {
  const { missionId } = useParams();
  const [missionData, setMissionData] = useState({});

  const fetchMissionData = async () => {
    try{
        const mission = await getMissionData(missionId);
        if(mission == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setMissionData(mission);
          console.log(mission);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMissionData();
}, []);

  const [searchText, setSearchText] = useState('');
  const [amount, setAmount] = useState('');
  const [showAmountPlaceholder, setShowAmountPlaceholder] = useState(true);
  const [description, setDescription] = useState('');
  const [showDescriptionPlaceholder, setShowDescriptionPlaceholder] = useState(true);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setShowAmountPlaceholder(e.target.value === '');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setShowDescriptionPlaceholder(e.target.value === '');
  };


  return (
    <Fragment>
     <div className="bg-home-bg min-h-screen">
        <Header title={"View Mission"}/>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '700px' }}>
            <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
              <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">{missionData.name}</h2>
              <div className="flex items-center ml-8 mt-8">
                <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
                <div>
                  <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{missionData.company_name}</p>
                  <p className="truncate text-base leading-5 text-sub-text">{missionData.location}</p>
                  <p className="truncate text-sm leading-5 text-sub-text">Mission Start-End: {missionData.start_date} - {missionData.end_date}</p>
                </div>
              </div>
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
              <div className="flex justify-end mr-8 mt-16 mb-4">
                <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl" onClick={() => setShowModal(true)}>
                  Bid to Mission
                </button>
                 <BidModal isVisible={showModal} onClose={() => setShowModal(false)}>
                  <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">Bid to {missionData.name}</h2>
                  <div className="flex items-center ml-8 mt-8">
                    <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
                    <div>
                      <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{missionData.company_name}</p>
                      <p className="truncate text-base leading-5 text-sub-text">{missionData.location}</p>
                      <p className="truncate text-sm leading-5 text-sub-text">Mission Start-End: {missionData.start_date} - {missionData.end_date}</p>
                    </div>
                  </div>

                  <h2 className="text-sm font-bold text-main-text mt-8 ml-8">Amount</h2>
                  <input
                    type="amount"
                    placeholder="Enter amount in dollars"
                    value={amount}
                    onChange={handleAmountChange}
                    className="bg-transparent border border-gray-300 rounded-lg p-2 ml-8 mb-4 w-64"
                  />
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
                    <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl ml-4" onClick={() => setShowModal(false)}>
                      Bid to Mission
                    </button>
                  </div>
                </BidModal> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default ApplicationDetailsCompany;
