import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {getAstronautData, rejectApplication, acceptApplication} from "../Requests";
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';


const MissionApplicant = ({application}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [salary, setSalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [applicant, setApplicant] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isProcessing, setProcessing] = useState(false);


    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const fetchApplicantData = async () => {
        try{
            if (!application){
                return;
            }
            setLoading(true);
            const app = await getAstronautData(application.astronaut_id);
            if (app === "No employee found with this id") {
                console.log("ahah")
            }
            else {
                setApplicant(app);

                if(app.application_status == "Processing"){
                    console.log("set true!");
                    setProcessing(true);
                }
                else{
                    console.log("set false!");
                }

                console.log(app);
            }

        } catch (error){
            console.error('Error fetching applicant:', error);
        } finally {
            setTimeout(() => setLoading(false), 300);
        }
    };

    const handleReject = async () => {
        try{
            if (!application){
                return;
            }

            const app = await rejectApplication(application.astronaut_id, application.mission_id);
            
            setAlertText('Reject application successful! Redirecting to applications...');
            setShowAlert(true);
            setTimeout(() => {
                window.location.href = '/company-applications';
            }, 2000);

        } catch (error){
            console.error('Error rejecting the application:', error);
        }
    };

    const isStartDateValid = () => {
        let dateArray = startDate.split(".");
        let newDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
        const day = parseInt(dateArray[0], 10);
        const month = parseInt(dateArray[1], 10) - 1;
        const year = parseInt(dateArray[2], 10);

        // Check if the day component is valid for the given month and year
        if (day > 0 && day <= new Date(year, month + 1, 0).getDate()) {
            const date = new Date(`${newDate}T00:00:00Z`); // Set time zone offset to 0

            // Check if the constructed Date object is valid
            if (
                date.getUTCFullYear() === year &&
                date.getUTCMonth() === month &&
                date.getUTCDate() === day
            ) {
                setStartDate(newDate); // Set birthdate in yyyy-mm-dd format
                return true; // Valid date
            }
        }

        return false; // Invalid date
    }

    const isSalaryValid = () => {
        return !isNaN(parseFloat(salary)) && isFinite(parseFloat(salary) && parseFloat(salary) > 0);
    };

    const handleAccept = async () => {
        if (!application){
            return;
        }
        if(!isSalaryValid()){
            setAlertText('Invalid salary');
            setShowAlert(true);
            return;
        }
        if(!isStartDateValid()){
            setAlertText('Invalid start date');
            setShowAlert(true);
            return;
        }
        try{
            await acceptApplication(application.astronaut_id, application.mission_id, salary, startDate);

            setAlertText('Accept application successful! Redirecting to applications...');
            setShowAlert(true);
            setTimeout(() => {
                window.location.href = '/company-applications';
            }, 2000);
        } catch (error){
            console.error('Error accepting the application:', error);
        }
    };

    useEffect(() => {
        fetchApplicantData();

    }, [application]);

    return (
        <div className="flex justify-center items-center h-full w-full">
            {isLoading ?
                (
                    <div className="text-center">
                        <CircularProgress sx={{color: "#635CFF"}} style={{ margin: '20px auto'}} size={50} color="primary" />
                        <p>Loading data...</p>
                    </div>
                )
                :
                (<div className="flex flex-col p-8 border rounded-xl h-96 bg-white shadow-lg justify-between" style={{ minWidth: '800px' }}>
                <div className="flex">
                    <div className="flex items-center">
                        <img width="120" height="120" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between">
                            <h2 className="text-2xl text-main-text font-semibold mb-4">{applicant?.name}</h2>
                            <div className='flex flex-row gap-2'>
                                {application.application_status === 'Rejected' ? (
                                <CancelIcon style={{ color: '#FF3B30', fontSize: '20px' }} />
                                ) : application.application_status === 'Accepted' ? (
                                <CheckCircleIcon style={{ color: '#51C080', fontSize: '20px' }} />
                                ) : application.application_status === 'Cancelled' ? (
                                <BlockIcon style={{ color: '#5b5e5b', fontSize: '20px' }} />
                                ) : (
                                <PendingIcon style={{ color: '#FFCE20', fontSize: '20px' }} />
                                )}
                                <p className="text-md font-medium text-main-text">{application.application_status}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="">
                                <p className="text-sm font-medium leading-6 text-main-text">Nationality: {applicant?.nationality}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Profession: {applicant?.profession}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Gender: {applicant?.sex}</p>
                                <p className="truncate text-sm font-medium leading-6 text-main-text">Address: {applicant?.address}</p>
                            </div>
                            <div className="">
                                <p className="text-sm font-medium leading-6 text-main-text">Age: {applicant?.age}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Height: {applicant?.height} cm</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Weight: {applicant?.weight} kg</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Birthday: {applicant?.birth_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-auto flex-col flex min-w-0 mt-2 p-2 border rounded-xl border-transparent border-10 bg-grey-bg">
                    <p className="truncate text-sm font-medium leading-6 text-main-text">{application.cover_letter}</p>
                </div>

                {application.application_status == "Processing" && (<div className= "flex justify-end">
                    <div className="flex">
                        <div className="flex mt-4 mb-2 mr-4">
                            <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-300" type="button">Start Date:</span>
                            <div className="relative w-28">
                                <input
                                    className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300"
                                    placeholder="dd.mm.yyyy"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    required />
                            </div>
                        </div>
                        <div className="flex mt-4 mb-2 mr-4">
                            <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300  focus:ring-4 focus:outline-none focus:ring-gray-300" type="button">Salary:</span>
                            <div className="relative w-28">
                                <input
                                    className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300"
                                    placeholder="Enter Salary"
                                    value={salary}
                                    onChange={handleSalaryChange}
                                    required />
                            </div>
                        </div>

                        <button
                            className="h-10 mt-4 mr-4 bg-button-green"
                            style={{width: '120px',padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            onClick={handleAccept}>
                            Accept
                        </button>
                        <button
                            className="h-10 mt-4 mr-4 bg-button-red"
                            style={{width: '120px',padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            onClick={handleReject}>
                            Reject
                        </button>
                    </div>
                </div>)}
            </div>)
            }
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

export default MissionApplicant