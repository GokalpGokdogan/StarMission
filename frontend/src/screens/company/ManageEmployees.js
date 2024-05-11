import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import CircularProgress from '@mui/material/CircularProgress';
import MissionPost from '../../components/MissionPost';
import SearchBar from '../../components/SearchBar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SingleEmployee from "../../components/SingleEmployee";
import {getEmployees, getMissionNames} from "../../Requests"; 
import { useUser } from '../../UserProvider';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const options = [
    { value: 'Washington DC, United States', label: 'Washington DC, United States' },
    { value: 'Texas, USA', label: 'Texas, USA' },
    { value: 'Ankara, Turkey', label: 'Ankara, Turkey' }
];

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


const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const {userId} = useUser();
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [missionNames, setMissionNames] = useState([]);
    const [missionNameOptions, setMissionNameOptions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [searchText, setSearchText] = useState(null);
    const [profession, setProfession] = useState(null);
    const [minAge, setMinAge] = useState(null);
    const [maxAge, setMaxAge] = useState(null);
    const [sex, setSex] = useState(null);
    const [minWeight, setMinWeight] = useState(null);
    const [maxWeight, setMaxWeight] = useState(null);
    const [minHeight, setMinHeight] = useState(null);
    const [maxHeight, setMaxHeight] = useState(null);
    const [missionName, setMissionName] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
      };

    /*const formatDate = (date) => {
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
      };*/

    const fetchEmployees = async (isInitialLoad = false) => {
      if (isInitialLoad) {
        setInitialLoading(true);
      } else {
        setIsFetching(true);
      }
  
      try {
        const apps = await getEmployees(userId, searchText, profession?.value, minAge, maxAge, sex?.value, minWeight, maxWeight, minHeight, maxHeight, null);
        setEmployees(apps);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        if (isInitialLoad) {
          setTimeout(() => setInitialLoading(false), 300);
        } else {
          setIsFetching(false);
        }
      }
    };

    const applyFilter = async () => {
      if((minAge != null &&  maxAge != null) && minAge > maxAge){
        setAlertText('Min Age cannot be bigger than Max Age!');
        setShowAlert(true);
      }
      else if((minWeight != null &&  maxWeight != null) && minWeight > maxWeight){
        setAlertText('Min Weight cannot be bigger than Max Weight!');      
        setShowAlert(true);
      }
      else if((minHeight != null &&  maxHeight != null) && minHeight > maxHeight){
        setAlertText('Min Height cannot be bigger than Max Height!');
        setShowAlert(true);
      }
      else{
        setLoading(true);
        console.log(userId, searchText, profession?.value, minAge, maxAge, sex?.value, minWeight, maxWeight, minHeight, maxHeight, null);
  
        try {
          const apps = await getEmployees(userId, searchText, profession?.value, minAge, maxAge, sex?.value, minWeight, maxWeight, minHeight, maxHeight, null);
          setEmployees(apps);
        } catch (error) {
          console.error('Error fetching employees:', error);
        } finally {
          setTimeout(() => setLoading(false), 300);        
      }
      }  
    };

  // Initial fetch on component mount
  useEffect(() => {
    fetchEmployees(true);
  }, []);

  // Fetch on searchText changes without showing the main loading spinner
  useEffect(() => {
    fetchEmployees();
  }, [searchText]);

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


     /*const [selectedDateRange, setSelectedDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    
   useEffect(() => {
        console.log(selectedDateRange);
        console.log(formatDate(selectedDateRange[0].startDate));
        console.log(formatDate(selectedDateRange[0].endDate));
    }, [selectedDateRange]);*/

    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');

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
                <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Manage Employees</p>
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
            {/*<div>
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
            </div>*/}
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
                  value={minAge?.toString()}
                  onChange={(e) => {
                    if(e.target.value == ""){
                      setMinAge(null);
                    }else{
                      const newMin = Math.max(0, parseFloat(e.target.value));
                      setMinAge(newMin);
                    }
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Max Budget Input */}
              <div className="mb-4 ml-4">
                <label className="block mb-1 text-main-text font-medium">Max Age</label>
                <input
                  type="number"
                  min={0}
                  value={maxAge?.toString()}
                  onChange={(e) => {
                    if(e.target.value == ""){
                      setMaxAge(null);
                    }else{
                      const newMax = Math.max(0, parseFloat(e.target.value));
                      setMaxAge(newMax);
                    }       
                  }}
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
                  value={minWeight?.toString()}
                  onChange={(e) => {
                    if(e.target.value == ""){
                      setMinWeight(null);
                    }else{
                      const newMin = Math.max(0, parseFloat(e.target.value));
                      setMinWeight(newMin);
                    }
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4 ml-4">
                <label className="block mb-1 text-main-text font-medium">Max Weight (kg)</label>
                <input
                  type="number"
                  min={0}
                  value={maxWeight?.toString()}
                  onChange={(e) => {
                    if(e.target.value == ""){
                      setMaxWeight(null);
                    }else{
                      const newMax = Math.max(0, parseFloat(e.target.value));
                      setMaxWeight(newMax);
                    }
                  }}
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
                  value={minHeight?.toString()}
                  onChange={(e) => {
                    if(e.target.value == ""){
                      setMinHeight(null);
                    }else{
                      const newMin = Math.max(0, parseFloat(e.target.value));
                      setMinHeight(newMin);
                    }
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4 ml-4">
                <label className="block mb-1 text-main-text font-medium">Max Height (cm)</label>
                <input
                  type="number"
                  min={0}
                  value={maxHeight?.toString()}
                  onChange={(e) => {
                    if(e.target.value == ""){
                      setMaxHeight(null);
                    }else{
                      const newMax = Math.max(0, parseFloat(e.target.value));
                    setMaxHeight(newMax);
                    }
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
            {/* Add other filters as needed */}
          </div>
                {/* Right container with mission postings */}
                <div className="w-3/4 p-4">
                    <div className="flex flex-col flex-wrap">
                        <div className="mt-6 mb-4">
                            <SearchBar input={searchText} onChange={handleSearchChange} />
                        </div>
                        {employees && employees.length > 0 ? 
                        (employees.map(emp => (
                            <SingleEmployee
                                name={emp.astronaut_name}
                                missions={[emp.name]}
                                profession={emp.profession ? emp.profession : "No jobs specified"}
                                age={emp.age}
                                location={emp.location ? emp.location: "No location specified"}
                                astronaut_id={emp.astronaut_id}
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
export default ManageEmployees;