import React from "react";

const EmployeeCard = ({employee}) => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col w-full max-w-4xl py-2 border rounded-xl bg-white shadow-lg">
                <div className="flex">
                    <div className="flex items-center">
                        <img width="120" height="120" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <h2 className="text-2xl text-main-text font-semibold mb-4">{employee.name}</h2>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium leading-6 text-main-text">Nationality: {employee.nationality}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Profession: {employee.profession}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Gender: {employee.sex}</p>
                                <p className="truncate text-sm font-medium leading-6 text-main-text">Address: {employee.address}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-6 text-main-text">Age: {employee.birth_date}</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Height: {employee.height} cm</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Weight: {employee.weight} kg</p>
                                <p className="text-sm font-medium leading-6 text-main-text">Birthday: {employee.birth_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <form className="flex">
                        <div className="flex mt-4 mb-2 mr-4">
                            <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-300" type="button">Start Date:</span>
                            <div className="relative w-28">
                                <input className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300" placeholder="dd.mm.yyyy" required />
                            </div>
                        </div>
                        <div className="flex mt-4 mb-2 mr-4">
                            <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300" type="button">Salary:</span>
                            <div className="relative w-28">
                                <input className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300" placeholder="Enter Salary" required />
                            </div>
                        </div>
                    </form>
                    <button className="h-10 mt-4 mr-4 bg-button-green" style={{width: '120px', padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Accept</button>
                    <button className="h-10 mt-4 mr-4 bg-button-red" style={{width: '120px', padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Reject</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeCard;
