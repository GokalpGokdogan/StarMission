import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import SearchBar from '../../components/SearchBar';
import SingleApplication from '../../components/SingleApplication'
import { getApplications, getMissionNames } from '../../Requests';
import { useUser } from '../../UserProvider';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//dont delete budget until you put it to missions

const professionOptions = [
  {value: null, label: 'Not specified' },
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Electrical Engineer', label: 'Electrical Engineer' },
  { value: 'Physicist', label: 'Physicist' },
  { value: 'Chemist', label: 'Chemist' },
  { value: 'Technician', label: 'Technician' },
  { value: 'Other', label: 'Other' }
];

const genderOptions = [
  {value: null, label: 'Not specified' },
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Other', label: 'Other' }
];

const ApplicationsCompany = () => {
  const { userId } = useUser();
  const [applications, setApplications] = useState([]);
  const [missionNames, setMissionNames] = useState([]);
  const [missionNameOptions, setMissionNameOptions] = useState([]);
  /* const [formattedDate, setFormattedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); */
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [minBudget, setMinBudget] = useState('0');
  const [maxBudget, setMaxBudget] = useState('0');
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [profession, setProfession] = useState(null);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [minWeight, setMinWeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(null);
  const [minHeight, setMinHeight] = useState(null);
  const [maxHeight, setMaxHeight] = useState(null);
  const [missionName, setMissionName] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
/* 
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
 */
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

/*   useEffect(() => {
    console.log(selectedDateRange);
    console.log(formatDate(selectedDateRange[0].startDate));
    console.log(formatDate(selectedDateRange[0].endDate));
    setStartDate(formatDate(selectedDateRange[0].startDate));
    setEndDate(formatDate(selectedDateRange[0].endDate));
  }, [selectedDateRange]); */

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchApplications = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setInitialLoading(true);
    } else {
      setIsFetching(true);
    }

    try {
      const apps = await getApplications(userId, searchText, profession?.value, minAge, maxAge, sex?.value, minWeight, maxWeight, minHeight, maxHeight, null, missionName?.value);
      setApplications(apps);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      if (isInitialLoad) {
        setTimeout(() => setInitialLoading(false), 300);
      } else {
        setIsFetching(false);
      }
    }
  };

  const applyFilter = async () => {
    if(minAge > maxAge){
      setAlertText('Min Age cannot be bigger than Max Age!');
      setShowAlert(true);
    }
    else if(minWeight > maxWeight){
      setAlertText('Min Weight cannot be bigger than Max Weight!');      
      setShowAlert(true);
    }
    else if(minHeight > maxHeight){
      setAlertText('Min Height cannot be bigger than Max Height!');
      setShowAlert(true);
    }
    else{
      setLoading(true);
      console.log(userId, searchText, profession?.value, minAge, maxAge, sex?.value, minWeight, maxWeight, minHeight, maxHeight, missionName?.value);

      try {
        const apps = await getApplications(userId, searchText, profession?.value, minAge, maxAge, sex?.value, minWeight, maxWeight, minHeight, maxHeight, null, missionName?.value);
        setApplications(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    }  
  };
  

  const fetchMissionNames = async () => {
    try {
      const missions = await getMissionNames(userId);
      setMissionNames(missions);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } 
  };

   // Initial fetch on component mount
   useEffect(() => {
    fetchMissionNames();
  }, []);

  useEffect(() => {
    const options = [
      { value: null, label: "Not specified" },
      ...missionNames.map(item => ({
        value: item.name,
        label: item.name
      }))
    ];
    setMissionNameOptions(options);
  }, [missionNames]);


  // Initial fetch on component mount
  useEffect(() => {
    fetchApplications(true);
  }, []);

  // Fetch on searchText changes without showing the main loading spinner
  useEffect(() => {
    fetchApplications();
  }, [searchText]);

  return (
    <div className="bg-home-bg h-full">
      <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
        <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Applications</p>
      </div>
      {initialLoading || loading? (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center mt-32">
            <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
            <p>Loading data...</p>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 p-6 border-r flex flex-col gap-2">
          <h2 className="text-lg font-semibold mb-1 self-center underline text-main-text">Filters</h2>
          {/*   <div>
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
            </div> */}
            <div className="mb-4">
              <label className="block mb-1 text-main-text text-md font-medium">Mission</label>
              <Select
                value={missionName}
                onChange={(e)=> {setMissionName(e); console.log(e);}}
                options={missionNameOptions}
                isSearchable={true}
                placeholder="Select Mission"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-main-text text-md font-medium">Profession</label>
              <Select
                value={profession}
                onChange={(e) => setProfession(e)}
                options={professionOptions}
                isSearchable={true}
                placeholder="Select Profession"
                className="w-full"
              />
            </div>
            <div className="flex">
              <div className="mb-4">
                <label className="block mb-1 text-main-text font-medium">Min Age</label>
                <input
                  type="number"
                  min={0}
                  value={minAge}
                  onChange={(e) => {
                    const newMin = Math.max(0, parseFloat(e.target.value)); // Ensure non-negative values
                    setMinAge(newMin);
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Max Budget Input */}
              <div className="mb-4 ml-4">
                <label className="block mb-1 text-main-text font-medium">Max Age</label>
                <input
                  type="number"
                  min="0"
                  value={maxAge}
                  onChange={(e) => {setMaxAge(e.target.value);}
                  }
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-main-text text-md font-medium">Gender</label>
              <Select
                value={sex}
                onChange={(e)=> {setSex(e); console.log(e);}}
                options={genderOptions}
                isSearchable={true}
                placeholder="Select Gender"
                className="w-full"
              />
            </div>
            <div className="flex">
              <div className="mb-4">
                <label className="block mb-1 text-main-text font-medium">Min Weight (kg)</label>
                <input
                  type="number"
                  min={0}
                  value={minWeight}
                  onChange={(e) => setMinWeight(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4 ml-4">
                <label className="block mb-1 text-main-text font-medium">Max Weight (kg)</label>
                <input
                  type="number"
                  min="0"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex">
              <div className="mb-4">
                <label className="block mb-1 text-main-text font-medium">Min Height (cm)</label>
                <input
                  type="number"
                  min={0}
                  value={minHeight}
                  onChange={(e) => setMinHeight(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4 ml-4">
                <label className="block mb-1 text-main-text font-medium">Max Height (cm)</label>
                <input
                  type="number"
                  min="0"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-center mb-2 mt-2 mr-2">
              <button type="button" className={`w-32 bg-button-purple text-white text-sm py-3 rounded-xl`} onClick={()=>applyFilter()}>
                Apply Filters
              </button>
            </div>
            {/* Add other filters as needed */}
          </div>
          {/* Right container with mission postings */}
          <div className="w-3/4 p-4">
            <div className="flex flex-col flex-wrap">
              <div className="mt-6 mb-4">
                <SearchBar input={searchText} onChange={handleSearchChange} />
              </div>
              {applications && applications.map(application => (
                <SingleApplication
                  application={application}
                />
              ))} 
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
export default ApplicationsCompany;