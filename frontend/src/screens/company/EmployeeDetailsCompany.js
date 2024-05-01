import React from 'react'
import { useParams } from 'react-router-dom'
import { getEmployeeData } from '../../Requests';
import { useState, useEffect } from 'react';
import EmployeeCard from '../../components/EmployeeCard';

const EmployeeDetailsCompany = () => {
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState({});

    const fetchEmployeeData = async () => {
        try{
            const emp = await getEmployeeData(employeeId);
            if(emp == "No applications found with these filters")
            {
              console.log("ahah")
            }
            else
            {
              setEmployeeData(emp);
              console.log(emp);
            }
            
        } catch (error){
            console.error('Error fetching emps:', error);
        }
    };

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    return (
        <div className="bg-home-bg h-full min-h-screen flex flex-col">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Application</p>
        </div>
        <div className="flex flex-grow justify-center items-center">
            <EmployeeCard employee={employeeData}></EmployeeCard>        
        </div>
    </div>
        
    )
}

export default EmployeeDetailsCompany