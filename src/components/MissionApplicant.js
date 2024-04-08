import React from "react";

const applicant =
    {
        fullName: 'Hans Stark',
        nationality: 'Germany',
        profession: 'Scientist',
        gender: 'Male',
        address: 'Cart Curt Street, Cart, Curt',
        age: 28,
        height: 183,
        weight: 77,
        birthday: '27.05.1995',
        coverLetter: 'Neden calismak istedigim burda yaziyo olacak',
    }

const MissionApplicant = () => {
    return (
        <div className="flex flex-col w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white shadow-lg">
            <div className="flex">
                <div className="flex items-center">
                    <img width="120" height="120" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="text-2xl text-main-text font-semibold mb-4">Hans Stark</h2>
                    <div className="flex justify-between">
                        <div className="">
                            <p className="text-sm font-medium leading-6 text-main-text">Nationality: {applicant.nationality}</p>
                            <p className="text-sm font-medium leading-6 text-main-text">Profession: {applicant.profession}</p>
                            <p className="text-sm font-medium leading-6 text-main-text">Gender: {applicant.gender}</p>
                            <p className="truncate text-sm font-medium leading-6 text-main-text">Address: {applicant.address}</p>
                        </div>
                        <div className="">
                            <p className="text-sm font-medium leading-6 text-main-text">Age: {applicant.age}</p>
                            <p className="text-sm font-medium leading-6 text-main-text">Height: {applicant.height} cm</p>
                            <p className="text-sm font-medium leading-6 text-main-text">Weight: {applicant.weight} kg</p>
                            <p className="text-sm font-medium leading-6 text-main-text">Birthday: {applicant.birthday}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-auto flex-col flex min-w-0 mt-2 p-2 border rounded-xl border-transparent border-10 bg-grey-bg">
                <p className="truncate text-sm font-medium leading-6 text-main-text">{applicant.coverLetter}</p>
            </div>
            <div className= "flex justify-end">
                <form class="flex">
                    <div className="flex mt-4 mb-2 mr-4">
                        <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:focus:ring-gray-800" type="button">Start Date:</span>
                        <div className="relative w-28">
                            <input className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300" placeholder="dd.mm.yyyy" required />
                        </div>
                    </div>
                    <div className="flex mt-4 mb-2 mr-4">
                        <span className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:focus:ring-gray-800" type="button">Salary:</span>
                        <div className="relative w-28">
                            <input className="h-10 block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300" placeholder="Enter Salary" required />
                        </div>
                    </div>
                </form>
                <button className="h-10 mt-4 mr-4 bg-button-green" style={{width: '120px',padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Accept</button>
                <button className="h-10 mt-4 mr-4 bg-button-red" style={{width: '120px',padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Reject</button>
            </div>
        </div>

    )
}

export default MissionApplicant