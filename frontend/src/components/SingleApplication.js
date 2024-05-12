import React from "react";
import {NavLink} from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';

const SingleApplication = ({application}) => {
  
    return (
        <li className="flex py-1">
            <div className="flex" style={{ width : "654px" }}>
            <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white">
                <div className="flex items-center">
                    <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-main-text">{application.astronaut_name}</p> 
                    <div className="flex flex-row align-center gap-1">             
                        <p className="truncate text-xs font-semibold leading-5 text-sub-text">Applied to:</p>
                        <div className="inline-block bg-button-purple text-white text-xs rounded-2xl px-1 py-0.5 text-center">{application.name}</div>
                    </div>
                    <p className="truncate text-xs leading-5 text-sub-text">{application.profession ? application.profession : "Not specified"}</p>
                </div>
                <div className="flex flex-col justify-start h-full">
                    <div className='flex flex-row gap-1 flex-grow'>
                            {application.application_status === 'Rejected' ? (
                            <CancelIcon style={{ color: '#FF3B30', fontSize: '16px' }} />
                            ) : application.application_status === 'Accepted' ? (
                            <CheckCircleIcon style={{ color: '#51C080', fontSize: '16px' }} />
                            ) : application.application_status === 'Cancelled' ? (
                            <BlockIcon style={{ color: '#5b5e5b', fontSize: '16px' }} /> 
                            ) : (
                            <PendingIcon style={{ color: '#FFCE20', fontSize: '16px' }} />
                            )}
                            <p className="text-xs font-medium text-main-text" >
                                {application.application_status}
                            </p>                        
                    </div>
                    <div className="flex items-center justify-end mr-2">
                        <NavLink
                            to={`/application-details/${application.astronaut_id}/${application.mission_id}/${application.applied_date}`}
                            className={`text-button-purple text-sm font-medium rounded-xl hover:text-indigo-700 flex justify-center`}
                        >
                            View profile
                        </NavLink>
                    </div>
                </div>
            </div>
            </div>
        </li>
    )
};

export default SingleApplication