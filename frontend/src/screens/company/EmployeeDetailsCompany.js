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
        <EmployeeCard employee={employeeData}></EmployeeCard>
    )
}

export default EmployeeDetailsCompany