import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import MissionPost from '../../components/MissionPost';
import SearchBar from '../../components/SearchBar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getRecentMissions } from '../../Requests';
import { useUser } from '../../UserProvider';
import Header from '../../components/Header';
import MissionItemAstro from '../../components/MissionItemAstro';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getPastMissions } from "../../Requests";
import CircularProgress from '@mui/material/CircularProgress';

const MissionPostingsAstronaut = () => {

  const {userId} = useUser();
  const [recentMissions, setRecentMissions] = useState([]);
  const [missionsPartner, setMissionsPartner] = useState([]);
  const [missions, setMissions] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [minBudget, setMinBudget] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);
  //const [leadingCompanyOptions, setLeadingCompanyOptions] = useState([]);
  //const [leadingCompanies, setLeadingCompanies] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [companyName, setcompanyName] = useState(null);
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

  useEffect(() => {
    setStartDate(formatDate(selectedDateRange[0].startDate));
    setEndDate(formatDate(selectedDateRange[0].endDate));
  }, [selectedDateRange]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const applyFilter = async () => {
    if ((minBudget != null && maxBudget != null) && minBudget > maxBudget) {
      setAlertText('Min Budget cannot be bigger than Max Budget!');
      setShowAlert(true);
    }
    else {
      fetchRecentMissions();
    }
  };

  const fetchRecentMissions = async () => {
    try{
        const mission = await getRecentMissions();
        if(mission == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setRecentMissions(mission);
          console.log("Recent Applications");
          console.log(mission);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    } finally {
      if (initialLoading) {
        setTimeout(() => setInitialLoading(false), 300);
      }
      else {
        setTimeout(() => setLoading(false), 300);
      }
    }
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
    fetchRecentMissions();
}, []);

  return (
    <div className="bg-home-bg h-full">
      <Header title={"Past Missions"} />
      {initialLoading || loading ? (
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
            <div className="mb-4">
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
              <button type="button" className={`w-32 bg-button-purple text-white text-sm py-3 rounded-xl`} onClick={() => applyFilter()}>
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
              {recentMissions && recentMissions.length > 0 ?
                (recentMissions.map(post => (
                  <MissionPost
                    key={post.key}
                    title={post.mission_name}
                    company={post.name}
                    location={post.location}
                    id={post.mission_id}
                    type="astronaut"
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

export default MissionPostingsAstronaut;
