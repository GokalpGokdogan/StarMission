import React from "react";

const SingleApplication = ({name, mission, nationality}) => {
    return (
        <li className="flex justify-center py-1 px-2">
            <div className="flex" style={{ width : "654px" }}>
            <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white">
                <div className="flex items-center">
                    <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-main-text">{name}</p>
                    <p className="truncate text-xs font-semibold leading-5 text-sub-text">{mission}</p>
                    <p className="truncate text-xs leading-5 text-sub-text">{nationality}</p>
                </div>
                <div className="flex items-center justify-center mb-2 mt-2 mr-2">
                    <button type="button" className={`w-20 bg-button-purple text-white text-sm py-2 rounded-xl`}>
                    View
                    </button>
                </div>
            </div>
            </div>
        </li>
    )
};

export default SingleApplication