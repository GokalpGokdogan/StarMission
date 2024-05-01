import React from "react";

const CompanyItem = ({ company }) => {
    return (
        <li className="flex px-1">
            <div className="flex items-center border py-2 w-full">
                <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="Company Logo" />
                <div className="flex-auto items-center justify-center">
                    <p className="truncate text-xs font-semibold leading-5 text-main-text">{company}</p>
                </div>
                <div className="items-center justify-center">
                    <a href="#" className="truncate text-xs font-semibold mr-3 text-main-text underline">View Bid</a>
                </div>
            </div>
        </li>
    );
};

export default CompanyItem;
