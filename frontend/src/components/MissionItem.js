import React from "react";

const MissionItem = ({title, company, location}) => {
    return (
        <li className="flex justify-center py-1 px-2">
            <div className="flex" style={{ width : "654px" }}>
            <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white">
                <div className="flex items-center">
                    <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-main-text">{title}</p>
                    <p className="truncate text-xs font-semibold leading-5 text-sub-text">{company}</p>
                    <p className="truncate text-xs leading-5 text-sub-text">{location}</p>
                </div>
            </div>
            </div>
        </li>
    )
};

export default MissionItem