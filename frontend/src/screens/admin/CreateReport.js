import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import { createReport } from "../../Requests";
import Header from '../../components/Header';
import { useUser } from "../../UserProvider";



const CreateReport = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [firstIsChecked, setFirstIsChecked] = useState(false);
    const [secondIsChecked, setSecondIsChecked] = useState(false);
    const [thirdIsChecked, setThirdIsChecked] = useState(false);
    const [fourthIsChecked, setFourthIsChecked] = useState(false);
    const [fifthIsChecked, setFifthIsChecked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const {userId} = useUser();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCreateReport = async () => {
        const indices = [];
        if (!firstIsChecked && !secondIsChecked && !thirdIsChecked && !fourthIsChecked && !fifthIsChecked) 
        {
            setAlertText("Please at least check one of them!!!!");
            setShowAlert(true);
        }
        else
        {
            if(firstIsChecked)
            {indices.push(0); }
            if(secondIsChecked)
            {indices.push(1);}
            if(thirdIsChecked)
            {indices.push(2);}
            if(fourthIsChecked)
            {indices.push(3);}
            if(fifthIsChecked)
            {indices.push(4);}
            console.log(indices);
           try{
            const mis = await  createReport(userId, description, name, indices);

            setAlertText('Report is created successfully! Redirecting to Dashboard page...');
            setShowAlert(true);
            setTimeout(() => {
                window.location.href = '/admin';
            }, 2000);

            console.log(mis);    
        } catch (error){
            console.error('Error firing the employee:', error);
        }
        }
        return indices;
    };

    return (
        <div className="bg-home-bg">
            <Header title={"Create Report"}/>

            <div className="bg-white mt-5 py-2 border rounded-xl border-transparent p-2 border-10 px-4 mx-auto max-w-2xl py-8">
                <h2 className="mb-4 text-xl font-bold text-main-text">Create Report</h2>
            
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-main-text">Report Name</label>
                            <input value={name} onChange={handleNameChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Report Name" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-main-text">Description</label>
                            <textarea value={description} onChange={handleDescriptionChange} id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Your description here"></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-main-text">Data to Include in the Report</label>
                            <div className="flex flex-col mt-2 mb-6 gap-2">
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" checked={firstIsChecked} onChange={()=>setFirstIsChecked(!firstIsChecked)}/>
                                    <label className="text-main-text text-sm">Missions with the most budget</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" checked={secondIsChecked} onChange={()=>setSecondIsChecked(!secondIsChecked)}/>
                                    <label className="text-main-text text-sm">Missions with the closest end date</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" checked={thirdIsChecked} onChange={()=>setThirdIsChecked(!thirdIsChecked)}/>
                                    <label className="text-main-text text-sm">Companies with the most number of active missions</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" checked={fourthIsChecked} onChange={()=>setFourthIsChecked(!fourthIsChecked)}/>
                                    <label className="text-main-text text-sm">Astronauts with the most number of past missions</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" checked={fifthIsChecked} onChange={()=>setFifthIsChecked(!fifthIsChecked)}/>
                                    <label className="text-main-text text-sm">Missions with the most number of partner companies</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold transition-colors duration-300 ease-in-out hover:bg-indigo-700 hover:text-gray-100 hover:shadow-lg`} onClick={handleCreateReport}>
                            Create Report
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

export default CreateReport