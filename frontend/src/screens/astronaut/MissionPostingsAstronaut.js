import React, { useState } from 'react';
import Select from 'react-select';
import MissionPost from '../../components/MissionPost';
import SearchBar from '../../components/SearchBar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const dataSource = [
  {
    key: '1',
    title: 'Space Discovery',
    company: 'NASA',
    location: 'Washington DC, United States',
  },
  {
    key: '2',
    title: 'Asteroid Ceres',
    company: 'NASA',
    location: 'Washington DC, United States',
  },
  {
    key: '3',
    title: 'Mesosphere AIM',
    company: 'NASA',
    location: 'Washington DC, United States',
  },
  {
    key: '4',
    title: 'Finding Water in Mars',
    company: 'NASA',
    location: 'Washington DC, United States',
  },
  {
    key: '5',
    title: 'Operation GT',
    company: 'NASA',
    location: 'Texas, USA',
  },
  {
    key: '6',
    title: 'Hedey Uzay 2024',
    company: 'Tübitak',
    location: 'Ankara, Turkey',
  }
];

const options = [
  { value: 'Washington DC, United States', label: 'Washington DC, United States' },
  { value: 'Texas, USA', label: 'Texas, USA' },
  { value: 'Ankara, Turkey', label: 'Ankara, Turkey' }
];

const MissionPostingsAstronaut = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
  };

  const handleMinBudgetChange = (event) => {
    setMinBudget(event.target.value);
  };

  const handleMaxBudgetChange = (event) => {
    setMaxBudget(event.target.value);
  };

  return (
    <div className="bg-home-bg h-full flex flex-col">
      <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
        <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Mission Postings</p>
      </div>
      <div className="flex">
        {/* Left container with filters */}
        <div className="w-1/4 p-4 border-r flex flex-col">
          <h2 className="text-lg font-semibold mb-1 text-main-text">Filters</h2>
          {/* Date Range Picker */}
          <div className="mb-2">
            <div className='flex flex-row justify-between'>
              <label className="block mb-1 text-main-text">Start and End Dates</label>
              <button onClick={()=> setIsExpanded(!isExpanded)}>
                {!isExpanded ? <ExpandMoreIcon className='bg-to-blue-500'/> : <ExpandLessIcon/>}
                
              </button>
            </div>
            {
              isExpanded ? 
              <DateRange
              editableDateInputs={true}
              onChange={item => setSelectedDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={selectedDateRange}
              style={{ width: '100%' }} // Set width to 100%
              className="w-full"
            /> : <></>
            }

          </div>
          {/* Location Dropdown */}
          <div className="mb-4">
            <label className="block mb-1 text-main-text">Location</label>
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              options={options}
              isSearchable={true}
              placeholder="Select Location"
              className="w-full"
            />
          </div>
          {/* Company Dropdown */}
          <div className="mb-4">
            <label className="block mb-1 text-main-text">Leading Company</label>
            <Select
              value={selectedCompany}
              onChange={handleCompanyChange}
              options={options}
              isSearchable={true}
              placeholder="Select Company"
              className="w-full"
            />
          </div>
          <div className="flex">
            {/* Min Budget Input */}
            <div className="mb-6">
              <label className="block mb-1 text-main-text">Min Budget</label>
              <input
              type="number"
              value={minBudget}
              onChange={handleMinBudgetChange}
              style={{ width: '90%' }} // Set width to 100%
              className="w-full py-1 px-1"
              />
            </div>
            {/* Max Budget Input */}
            <div className="mb-6 ml-4">
              <label className="block mb-1 text-main-text">Max Budget</label>
              <input
                type="number"
                value={maxBudget}
                onChange={handleMaxBudgetChange}
                style={{ width: '100%' }} // Set width to 100%
                className="w-full py-1 px-1 justify-end"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mb-2 mt-2 mr-2">
            <button type="button" className={`w-32 bg-button-purple text-white text-sm py-3 rounded-xl`}>
              Apply Filters
            </button>
          </div>
          {/* Add other filters as needed */}
        </div>
        {/* Right container with mission postings */}
        <div className="w-3/4 p-4">
          <div className="flex flex-wrap">
            <div className="mt-6 mb-4">
              <SearchBar input="INPUT" />
            </div>
            {dataSource.map(post => (
              <MissionPost
                key={post.key}
                title={post.title}
                company={post.company}
                location={post.location}
                type="astronaut"
              />
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MissionPostingsAstronaut;
