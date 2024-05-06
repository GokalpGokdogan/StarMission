import React, { useState, useEffect } from 'react';
import {Link, Route} from 'react-router-dom';
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import SearchBar from '../../components/SearchBar';
import SingleApplication from '../../components/SingleApplication'
import { getApplications } from '../../Requests';
import { useUser } from '../../UserProvider';


const options = [
  { value: 'Washington DC, United States', label: 'Washington DC, United States' },
  { value: 'Texas, USA', label: 'Texas, USA' },
  { value: 'Ankara, Turkey', label: 'Ankara, Turkey' }
];

const ApplicationsCompany = () => {
  const {userId} = useUser();
  const [applications, setApplications] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [searchText, setSearchText] = useState(null);

  const formatDate = (date) => {
    if (!date) return null; // Check if date is null or undefined
    const d = new Date(date);
    if (isNaN(d.getTime())) return null; // Check if the date object is valid using getTime()
  
    // Format the date using local date components to avoid timezone issues
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // getMonth returns 0-11, need to add 1 for correct month
    const day = d.getDate(); // getDate returns day of the month
  
    // Ensure the month and day are two digits
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const [selectedDateRange, setSelectedDateRange] = useState([
    {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    }
]);

const [selectedLocation, setSelectedLocation] = useState('');
const [selectedCompany, setSelectedCompany] = useState('');
const [minBudget, setMinBudget] = useState('0');
const [maxBudget, setMaxBudget] = useState('0');

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

useEffect(() => {
    console.log(selectedDateRange);
    console.log(formatDate(selectedDateRange[0].startDate));
    console.log(formatDate(selectedDateRange[0].endDate));
}, [selectedDateRange]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); 
  };

  const fetchApplications = async () => {
    try{
        const apps = await getApplications(userId, searchText, null, null, null, null, null, null, null, null, null, null);
        if(apps == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setApplications(apps);
          console.log(apps);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

    useEffect(() => {
      fetchApplications();
  }, [searchText]);

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Applications</p>
        </div>

           <div className="flex">
                {/* Left container with filters */}
                <div className="w-1/4 p-4 border-r flex flex-col">
                    <h2 className="text-lg font-semibold mb-1 text-main-text">Filters</h2>
                    {/* Date Range Picker */}
                    <div className="mb-2">
                        <label className="block mb-1 text-main-text">Start and End Dates</label>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setSelectedDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={selectedDateRange}
                            rangeColors={["#5569ff"]}
                            style={{ width: '100%' }}
                            className="w-full"
                        />
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
                          <label className="block mb-1 text-main-text font-medium text-gray-700">Min Budget</label>
                          <input
                              type="number"
                              min={0}
                              value={minBudget}
                              onChange={(e) => {
                                  const newMin = Math.max(0, parseFloat(e.target.value)); // Ensure non-negative values
                                  if (newMin <= maxBudget) {
                                      handleMinBudgetChange(e); // Update state if valid
                                  }
                              }}
                              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                      </div>
                      {/* Max Budget Input */}
                      <div className="mb-6 ml-4">
                          <label className="block mb-1 text-main-text font-medium text-gray-700">Max Budget</label>
                          <input
                              type="number"
                              min="0"
                              value={maxBudget}
                              onChange={(e) => {
                                  const newMax = Math.max(0, parseFloat(e.target.value)); // Ensure the value is not less than 0
                                  if (newMax >= minBudget) {
                                      handleMaxBudgetChange({ ...e, target: { ...e.target, value: newMax.toString() } }); // Update state if valid
                                  }
                              }}
                              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                    <div className="flex flex-col flex-wrap">
                        <div className="mt-6 mb-4">
                            <SearchBar />
                        </div>
                        {applications && applications.map(application => (  
                        <SingleApplication
                          application={application}
                        />
                      ))}
                    </div>
                </div>
            </div>
    </div>
  );
};
export default ApplicationsCompany;