import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { createMission } from "../../Requests";
import Header from '../../components/Header';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../../UserProvider";

const CreateMission = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [important_notes, setImportantNotes] = useState('');
    const [inputs, setInputs] = useState([{ note: "" }]);
    const {userId} = useUser();
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const getJoinedString = () => {
        // Extract values efficiently using map
        const values = inputs.map((item) => item.note);
        console.log("values " + values);
        return values.join('$$$$'); // Consistent delimiter usage
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleBudgetChange = (e) => {
        const newBudget = e.target.value === '' ? null : Math.max(0, parseFloat(e.target.value));
        setBudget(newBudget);
    };

    const isBudgetValid = () => {
        return !isNaN(parseFloat(budget)) && isFinite(parseFloat(budget) && parseFloat(budget) > 0);
    };

    const isDateValid = (date) => {
        const regex = /^\d{2}\.\d{2}\.\d{4}$/;

        return regex.test(date);
    }

    const handleCreateMission = async (e) => {
        if(!name){
            setAlertText('Please enter a name!');
            setShowAlert(true);

            return;
        }
        if(!location){
            setAlertText('Please enter a location!');
            setShowAlert(true);

            return;
        }
        if(!isDateValid(start_date)){
            setAlertText('Invalid start date');
            setShowAlert(true);

            return;
        }
        if(!isDateValid(end_date)){
            setAlertText('Invalid end date');
            setShowAlert(true);

            return;
        }
        if(!isBudgetValid()){
            setAlertText('Invalid budget');
            setShowAlert(true);

            return;
        }
        try{
            e.preventDefault(); // Prevent default form submission behavior
            await createMission(userId, name, location, formatDate(start_date), formatDate(end_date), description, budget, important_notes);
                     
            setAlertText('Create mission successful! Redirecting to leading missions...');
            setShowAlert(true);

            const redirectUrl = `/leading-missions`;
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000);
    
        } catch (error){
            if(error.response.data == "An error occured while creating mission: MISSION NAME IS ALREADY TAKEN"){
                setAlertText('Mission name is already taken!');
                setShowAlert(true);
            }
            else if(error.response.data == "An error occured while creating mission: MISSION BUDGET EXCEEDS BALANCE"){
                setAlertText('Mission budget exceeds balance!');
                setShowAlert(true);
            }
            
            console.error('Error creating mission:', error);
            console.log(error.response.data);
        }
    };

    const formatDate = (date) => {
        let dateArray = date.split(".");
        let newDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
        const day = parseInt(dateArray[0], 10);
        const month = parseInt(dateArray[1], 10) - 1;
        const year = parseInt(dateArray[2], 10);

        console.log("day: " + day + " month: " + month + " year: " + year);

        // Check if the day component is valid for the given month and year
        if (day > 0 && day <= new Date(year, month + 1, 0).getDate()) {
            const date = new Date(`${newDate}T00:00:00Z`); // Set time zone offset to 0

            // Check if the constructed Date object is valid
            if (
                date.getUTCFullYear() === year &&
                date.getUTCMonth() === month &&
                date.getUTCDate() === day
            ) {
                return newDate; // Valid date
            }
        }

        return null;
    }


    useEffect(() => {
        console.log(inputs);
        const joinedString = getJoinedString();
        setImportantNotes(joinedString);
    }, [inputs]);

    return (
        <div className="bg-home-bg">
            <Header title={"Create Mission"}/>
            <div className="bg-white mt-5 py-2 border rounded-xl border-transparent p-2 border-10 py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-main-text">Create New Mission</h2>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-main-text">Mission Name</label>
                        <input value={name} onChange={handleNameChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Mission Name" required="" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-main-text">Location</label>
                        <input value={location} onChange={handleLocationChange} type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Location" required="" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-main-text">Start Date</label>
                        <input value={start_date} onChange={handleStartDateChange} type="text" name="start-date" id="start-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="dd.mm.yyyy" required="" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-main-text">End Date</label>
                        <input value={end_date} onChange={handleEndDateChange} type="text" name="start-date" id="start-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="dd.mm.yyyy" required="" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="budget" className="block mb-2 text-sm font-medium text-main-text">Budget ($)</label>
                        <input                             
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="Enter Budget" 
                        required="" 
                        value={budget?.toString()} 
                        onChange={handleBudgetChange} 
                        type="number" 
                        min={0}
                        name="budget" 
                        id="budget" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-main-text">Description</label>
                        <textarea value={description} onChange={handleDescriptionChange} id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Your description here"></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-main-text">Important Notes Prior to Undesirable Situations</label>
                        <AddDynamicInputFields inputs={inputs} setInputs={setInputs} />
                    </div>
                </div>
                <div className="pt-4 flex justify-end">
                    <button type="submit" 
                    className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold transition-colors duration-300 ease-in-out hover:bg-indigo-700 hover:text-gray-100 hover:shadow-lg`}
                    onClick={(e) => {
                        handleCreateMission(e);
                    }}>                            
                        Post Mission
                    </button>
                </div>
            </div>
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
    )
}

export default CreateMission