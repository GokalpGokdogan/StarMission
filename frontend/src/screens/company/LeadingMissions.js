import React, { useState, useEffect } from 'react';
import MissionItem from '../../components/MissionItem';
import SearchBar from '../../components/SearchBar';
import { getLeadingMissions } from '../../Requests';
import { useUser } from '../../UserProvider';
import Header from '../../components/Header';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {getPartnerMissions, getLeadingCompanyNames} from "../../Requests";
import CircularProgress from '@mui/material/CircularProgress';
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const LeadingMissions = () => {
  const [missions, setMissions] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const {userId} = useUser();
  const [searchText, setSearchText] = useState('');
  const [minBudget, setMinBudget] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);

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

  const handleDateReset = () => {
    const resetDate = [
     {
       startDate: null,
       endDate: null,
       key: 'selection'
     }
   ];

   setStartDate(null);
   setEndDate(null);
   setSelectedDateRange(resetDate);
 }

  useEffect(() => {
    console.log(selectedDateRange);
    console.log(formatDate(selectedDateRange[0].startDate));
    console.log(formatDate(selectedDateRange[0].endDate));
    setStartDate(formatDate(selectedDateRange[0].startDate));
    setEndDate(formatDate(selectedDateRange[0].endDate));
  }, [selectedDateRange]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  
  const isNumberValid = (budget) => {
    return !isNaN(parseFloat(budget)) && isFinite(parseFloat(budget) && parseFloat(budget) > 0);
  };

  const applyFilter = async () => {
    if((minBudget != null &&  maxBudget != null) && minBudget > maxBudget){
      setAlertText('Min Budget cannot be bigger than Max Budget!');
      setShowAlert(true);
    }
    else{
      setLoading(true);

      try {
        const res = await getLeadingMissions(userId, searchText, startDate, endDate, location, minBudget, maxBudget);

        setMissions(res);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }          
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  useEffect(() => {
    fetchMissions();
  }, [searchText]);

  const fetchMissions = async () => {
    try{
      const missions = await getLeadingMissions(userId, searchText, startDate, endDate, location, minBudget, maxBudget);    
      setMissions(missions);        
    } catch (error){
        console.error('Error fetching missions:', error);
    }
    finally {
      setTimeout(() => setInitialLoading(false), 300);
    }
  };

  useEffect(() => {  
    fetchMissions();
  }, []);

  return (
    <div className="bg-home-bg h-full">
        <Header title={"Leading Missions"}/>
        {initialLoading || loading? (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center mt-32">
            <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
            <p>Loading data...</p>
          </div>
        </div>
        ) : (
        <div className="flex">
          <div className="w-1/4 p-6 border-r flex flex-col bg-filter-bg ml-6 mr-6 my-8 gap-2 rounded-lg h-full">
            <h2 className="text-lg font-semibold mb-1 self-center underline text-main-text">Filters</h2>
          <div>
              <label className="block mb-1 text-main-text font-medium">Start and End Dates</label>
              <DateRange
                editableDateInputs={true}
                onChange={item => setSelectedDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={selectedDateRange}
                rangeColors={["#5569ff"]}
                style={{ width: '100%' }}
                className="w-full"
              />
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-button-red text-white text-sm mt-2 px-2 py-2 rounded-xl ml-4"
                  onClick={() => handleDateReset()}>
                  Reset
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-main-text font-medium">Location</label>
              <input
                value={location}
                type="text" 
                id="search-input"
                onChange={(e) => {
                  const newLoc = e.target.value === '' ? null : e.target.value;
                  setLocation(newLoc);
                }}
                className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex">
              <div className="mb-4">
                <label className="block mb-1 text-main-text font-medium">Min Budget</label>
                <input
                  type="number"
                  min={0}
                  value={minBudget?.toString()}
                  onChange={(e) => {
                    const newMin = e.target.value === '' ? null : Math.max(0, parseFloat(e.target.value));
                    setMinBudget(newMin);
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4 ml-4">
                <label className="block mb-1 text-main-text font-medium">Max Budget</label>
                <input
                  type="number"
                  min={0}
                  value={maxBudget?.toString()}
                  onChange={(e) => {
                    const newMax = e.target.value === '' ? null : Math.max(0, parseFloat(e.target.value));
                    setMaxBudget(newMax);
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-center mb-2 mt-2 mr-2">
              <button type="button" className={`w-32 bg-button-purple text-white text-sm py-3 rounded-xl`} onClick={()=>applyFilter()}>
                Apply Filters
              </button>
            </div>
          </div>
          {/* Right container with mission postings */}
          <div className="w-3/4 p-4">
            <div className="flex flex-col flex-wrap">
              <div className="mt-6 mb-4">
                <SearchBar input={searchText} onChange={handleSearchChange} />
              </div>
              {missions && missions.length > 0 ? 
              (missions.map(mission => (
                <MissionItem
                  title={mission.name}
                  location={mission.location ? mission.location: "No location specified"}
                  type="leading"
                  id={mission.mission_id}
                />
                ))) : (
                  <div className="flex justify-center w-[60%] h-[80%]">
                      <p className="text-3xl font-semibold leading-6 text-main-text mt-[30%]" >No data</p>
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
  );
};
export default LeadingMissions;