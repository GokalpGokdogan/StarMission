import React, { Fragment, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import BidModal from '../../components/BidModal';

//Kodun indentationı bozuk, daha sonra düzeltilsin!!!!
const MissionDetailsAstronaut = () => {
  const [showModal, setShowModal] = useState(false);
  const dataSource = {
    title: 'Asteroid Ceres',
    company: 'NASA',
    location: 'United States, Washington DC',
    startDate: '07.02.2024',
    endDate: '24.03.2024',  
    description: 'Asteroid Ceres is an extensive and ambitious mission aimed at unraveling the enigmatic mysteries surrounding the orbital dynamics of celestial bodies within our solar system. As a vital member of a carefully selected crew of 20 individuals, you will embark on a journey spanning vast expanses, conducting intricate scientific experiments across a myriad of locations, traversing an awe-inspiring distance of 1.545 billion kilometers. With each passing month, the culmination of your efforts will be meticulously documented, requiring thorough analysis and interpretation of intricate statistical data to unveil the secrets hidden within the cosmic tapestry. Successfully completing this monumental undertaking will not only mark a significant milestone in your career but also grant you unparalleled opportunities to delve into further exploration, delving into the depths of space to study celestial phenomena, including the enigmatic dark holes scattered throughout the vast expanse of the Milky Way galaxy.',
    importantNotes: [
      'Wear appropriate space suit at all times.',
      'Follow safety protocols during experiments.',
      'Report any anomalies immediately.',
      'Wear appropriate space suit at all times.',
      'Follow safety protocols during experiments.'
    ]
  }; 

  const [searchText, setSearchText] = useState('');
  const [coverletter, setCoverletter] = useState('');
  const [showCoverletterPlaceholder, setShowCoverletterPlaceholder] = useState(true);

  const handleCoverletterChange = (e) => {
    setCoverletter(e.target.value);
    setShowCoverletterPlaceholder(e.target.value === '');
  };
  

  return (
    <Fragment>
    <div className="bg-home-bg min-h-screen">
      <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
        <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>View Mission</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '700px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">{dataSource.title}</h2>
            <div className="flex items-center ml-8 mt-8">
              <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
              <div>
                <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{dataSource.company}</p>
                <p className="truncate text-base leading-5 text-sub-text">{dataSource.location}</p>
                <p className="truncate text-sm leading-5 text-sub-text">Mission Start-End: {dataSource.startDate} - {dataSource.endDate}</p>
              </div>
            </div>
            <div className="flex flex-col px-1 py-1 ml-8 mr-8 mt-8 mb-4 w-128 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 ml-3 mr-3 mt-3 text-sub-text">{dataSource.description}</p>
            </div>
            <h2 className="text-xl font-bold text-main-text mt-4 ml-8">Important Notes</h2>
            <div className="flex flex-col px-1 py-1 ml-8 mr-8 mt-2 w-128 bg-grey-bg rounded-xl">
              <p className="text-sm font-semibold leading-5 mb-1 mt-1 ml-3 mr-3 text-sub-text">
              <ul className="list-disc list-inside">
                  {dataSource.importantNotes.map((note, index) => (
                    <li key={index} className="text-sm">{note}</li>
                  ))}
                </ul>
              </p>
            </div>
            <div className="flex justify-end mr-8 mt-16 mb-4 z-50">
              <button type="button" className="w-auto bg-button-purple text-white text-sm px-2 py-3 rounded-xl" onClick={() => setShowModal(true)}>
                Apply to Mission
              </button>
              <BidModal isVisible={showModal} onClose={() => setShowModal(false)}>  
                    <h2 className="text-3xl font-bold text-main-text mt-8 ml-12">Apply to {dataSource.company}</h2>
                    <div className="flex items-center ml-8 mt-8">
                    <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
                    <div>
                      <p className="text-xl font-semibold leading-5 mt-3 text-main-text">{dataSource.title}</p>
                      <p className="truncate text-base leading-5 text-sub-text">{dataSource.location}</p>
                      <p className="truncate text-sm leading-5 text-sub-text">Mission Start-End: {dataSource.startDate} - {dataSource.endDate}</p>
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
                  <button type="button" className="w-32 bg-button-purple text-white text-sm px-2 py-3 rounded-xl ml-4" onClick={() => setShowModal(false)}>
                    Apply
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

export default MissionDetailsAstronaut;
