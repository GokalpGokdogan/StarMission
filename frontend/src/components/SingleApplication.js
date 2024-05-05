import React from "react";
import {NavLink} from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';

const SingleApplication = ({application}) => {
  
    return (
        <li className="flex justify-center py-1 px-2">
            <div className="flex" style={{ width : "654px" }}>
            <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white">
                <div className="flex items-center">
                    <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                </div>
                <div className="min-w-0 flex-auto">
                    <div className="flex grid grid-cols-2">
                        <p className="text-sm font-semibold leading-6 text-main-text">{application.astronaut_name}</p>               
                        <div className='flex flex-row gap-2 ml-32'>
                            {application.application_status === 'Rejected' ? (
                            <CancelIcon style={{ color: '#FF3B30', fontSize: '16px' }} />
                            ) : application.application_status === 'Accepted' ? (
                            <CheckCircleIcon style={{ color: '#51C080', fontSize: '16px' }} />
                            ) : (
                            <PendingIcon style={{ color: '#FFCE20', fontSize: '16px' }} />
                            )}
                            <p className="text-sm font-medium text-main-text">{application.application_status}</p>
                        </div>
                    </div>
                    <p className="truncate text-xs font-semibold leading-5 text-sub-text">{application.name}</p>
                    <p className="truncate text-xs leading-5 text-sub-text">{application.nationality}</p>
                </div>
                <div className="flex items-center justify-center mb-2 mt-2 mr-2">
                    <NavLink
                        to={`/application-details/${application.astronaut_id}/${application.mission_id}/${application.applied_date}`}
                        className={`w-20 bg-button-purple text-white text-sm py-2 rounded-xl hover:bg-indigo-700 flex justify-center`}
                    >
                        View
                    </NavLink>
                </div>
            </div>
            </div>
        </li>
    )
};

export default SingleApplication