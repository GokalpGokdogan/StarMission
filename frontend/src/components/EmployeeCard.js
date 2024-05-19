import React from "react";
import { getMissionOfAstronaut, fireEmployee, getImageById } from '../Requests';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";

const EmployeeCard = ({ employee }) => {
    const [loading, setLoading] = useState(true);
    const [mission, setMission] = useState({}); 
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [url, setUrl] = useState(''); 

    const fetchImage = async () => {
        try{
            const mis = await getImageById(employee.user_id);
  
            setUrl(mis);
            console.log(mis);      
        } catch (error){
            console.error('Error fetching missions:', error);
        } 
    }
  
    useEffect(() => {
        fetchImage();
      }, []);

    const fetchMission = async () => {
        try{
            const mis = await getMissionOfAstronaut(employee.user_id);

            setMission(mis);
            console.log(mis);      
        } catch (error){
            console.error('Error fetching missions:', error);
        } finally{
            setTimeout(() => setLoading(false), 300);
        }
    }

    const fireEmp = async () => {
        try{
            const mis = await fireEmployee(employee.user_id, mission.mission_id);

            setAlertText('Employee is fired successfully! Redirecting to Employees page...');
            setShowAlert(true);
            setTimeout(() => {
                window.location.href = '/manage-employees';
            }, 2000);

            console.log(mis);    
        } catch (error){
            if (error.response && error.response.status && error.response.status === 401) {
                setAlertText('Astronaut is working for less than 6 months. Can not fire!');
                setShowAlert(true);
            }
            else{
                setAlertText('Unknown error!');
                setShowAlert(true);
            }

            console.error('Error firing the employee:', error);
        }
    }

    const formatDate = (date) => {
        var day = new Date(date).getDate();
        var month = new Date(date).getMonth() + 1;
        var year = new Date(date).getFullYear();
      
        if(day < 10){
          day = "0" + day;
        }
      
        if(month < 10){
          month = "0" + month;
        }
      
        return day + "." + month + "." + year;
    }

    useEffect(() => {
        fetchMission();
    }, [employee]);

    return (
        <div className="flex justify-center items-center w-full">
            {loading ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center mt-32">
                <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
                <p>Loading data...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col max-w-4xl w-full h-96 p-8 border rounded-xl bg-white shadow-lg justify-between">
                <div className="flex">
                    <div className="flex items-start">
                        <Avatar sx={{height: 56, width: 56}} alt="Remy Sharp" src={url} className="mr-2"/> 
                    </div>
                    <div className="flex flex-col flex-1">
                        <h2 className="text-2xl text-main-text font-semibold ml-2 mb-4">{employee.name}</h2>
                        <div className="flex justify-between">
                            <div className="ml-2">
                                <p className="text-sm font-medium leading-6 text-main-text">Nationality: {employee.nationality}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Profession: {employee.profession}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Gender: {employee.sex}</p>
                                <p className="truncate text-sm font-medium leading-6 text-main-text">Address: {employee.address}</p>
                            </div>
                            <div className="ml-2">
                            <p className="text-sm font-medium leading-6 text-main-text">Age: {employee.age !== null ? employee.age : "not specified"}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">
                                    Height: {employee.height !== null ? `${employee.height} cm` : "not specified"}
                                </p>
                                <p className="text-sm font-medium leading-6 text-main-text">
                                    Weight: {employee.weight !== null ? `${employee.weight} kg` : "not specified"}
                                </p>
                                <p className="text-sm font-medium leading-6 text-main-text">Birthday: {formatDate(employee.birth_date)}</p>
                            </div>
                        </div>
                        <div className="bg-blue-bg p-2 rounded-xl mt-5 ml-16 mr-44">
                            <h2 className="text-md text-purple-text font-semibold">Mission Information</h2>
                            <p className="text-sm font-medium leading-6 text-purple-text">Name: {mission.name}</p>
                            <p className="text-sm font-medium leading-6 text-purple-text">Starting Date: {formatDate(mission.starting_date)}</p>
                            <p className="text-sm font-medium leading-6 text-purple-text">Salary: {mission.salary} €</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="h-10 mt-4 mr-4 bg-button-red" style={{ padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => fireEmp()}>Fire Astronaut</button>
                </div>
            </div>
        )}
        {showAlert && (
          <div className={`fixed bottom-4 right-4 max-w-96 flex ${alertText.length > 40 ? 'flex-col items-end justify-center' : 'flex-row items-center'}`}>
              <Alert severity={'success'} className="w-full">
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

export default EmployeeCard;
