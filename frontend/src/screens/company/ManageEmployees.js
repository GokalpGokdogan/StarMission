import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import MissionPost from '../../components/MissionPost';
import SearchBar from '../../components/SearchBar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import SingleEmployee from "../../components/SingleEmployee";
import {getEmployees} from "../../Requests"; 
import { useUser } from '../../UserProvider';
const options = [
    { value: 'Washington DC, United States', label: 'Washington DC, United States' },
    { value: 'Texas, USA', label: 'Texas, USA' },
    { value: 'Ankara, Turkey', label: 'Ankara, Turkey' }
];
const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const {userId} = useUser();
    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                const employees = await getEmployees(userId);
                setEmployees(employees);
            } catch (error){
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);
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
                            style={{ width: '100%' }} // Set width to 100%
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
                    <div className="flex flex-col flex-wrap">
                        <div className="mt-6 mb-4">
                            <SearchBar />
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
            </div>
        </div>
    );
};
export default ManageEmployees;