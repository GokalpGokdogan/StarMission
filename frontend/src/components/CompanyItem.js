import React from "react";
//This is actually CompanyBidItem, name can be changed later for more clarity
const CompanyItem = ({ company }) => {
    return (
        <li className="flex px-1 w-full">
            <div className="flex items-center border py-2 ">
                <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="Company Logo" />
                <div className="flex-auto items-center justify-center">
                    <p className="truncate text-xs font-semibold leading-5 text-main-text">{company} bid 10.000</p>
                </div>
                <div className="items-center justify-center">
                    <a href="#" className="truncate text-xs font-semibold mr-3 text-main-text underline">View Bid</a>
                </div>
            </div>
        </li>
    );
};

export default CompanyItem;
