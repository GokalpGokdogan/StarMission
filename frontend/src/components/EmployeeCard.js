import React from "react";

const EmployeeCard = ({employee}) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col w-full max-w-4xl p-8 border rounded-xl h-96 bg-white shadow-lg justify-between">
                <div className="flex">
                    <div className="flex items-center">
                        <img width="120" height="120" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                    </div>
                    <div className="flex flex-col flex-1 ">
                        <h2 className="text-2xl text-main-text font-semibold mb-4">{employee.name}</h2>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium leading-6 text-main-text">Nationality: {employee.nationality}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Profession: {employee.profession}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Gender: {employee.sex}</p>
                                <p className="truncate text-sm font-medium leading-6 text-main-text">Address: {employee.address}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-6 text-main-text">Age: {employee.age}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Height: {employee.height} cm</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Weight: {employee.weight} kg</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Birthday: {employee.birth_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="h-10 mt-4 mr-4 bg-button-red" style={{padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Fire Astronaut</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeCard;
