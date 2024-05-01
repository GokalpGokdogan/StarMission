import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const SingleEmployee = ({ name, missions, profession, age, location, astronaut_id }) => {
    return (
        <li className="flex justify-center py-1 px-2">
            <div className="flex" style={{ width: "654px" }}>
                <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white">
                    <div className="flex items-center">
                        <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                    </div>
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-main-text">{name}</p>
                        <p className="truncate text-xs font-semibold leading-5 text-sub-text">{profession}, {age}</p>
                        <div className="flex">
                            <p className="truncate text-xs leading-5 text-main-text">Current Mission:&nbsp;</p>
                            {missions.map((mission, index) => (
                                <Fragment key={index}>
                                    <p className="truncate text-xs leading-5 text-sub-text">{mission}</p>
                                    {index !== missions.length - 1 && <p className="text-xs leading-5 text-sub-text">,&nbsp;</p>}
                                </Fragment>
                            ))}
                        </div>
                        <div className="flex">
                            <svg className="h-3 w-3 text-red-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="truncate text-xs leading-5 text-sub-text">{location}</p>
                        </div>

                    </div>
                    <div className="flex items-end justify-end mr-2">
                        {/*  <a href="#" className={`text-button-purple text-sm py-2 text-center`}>
                            View Profile
                        </a> */}
                        <NavLink
                            to={`/employee-details/${astronaut_id}`}
                            className={`w-28 bg-button-purple text-white text-sm py-2 rounded-xl hover:bg-indigo-700 flex justify-center`}
                        >
                            View Profile
                        </NavLink>
                    </div>
                </div>
            </div>
        </li>
    )
};

export default SingleEmployee