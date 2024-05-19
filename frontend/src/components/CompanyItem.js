import React from "react";
import { Avatar } from "@mui/material";
//This is actually CompanyBidItem, name can be changed later for more clarity
const CompanyItem = ({ company_name, requested_amount, bidId }) => {

    const bidUrl = `/bid-details/${bidId}`;
    
    return (
        <li className="flex px-1">
            <div className="flex items-center border py-2 px-2 w-full">
                <div className="flex-auto items-center justify-center">
                    <p className="truncate text-xs font-semibold leading-5 text-main-text">{company_name} bid ${requested_amount}  </p>
                </div>
                <div className="items-center justify-center">
                    <a href={bidUrl} className="truncate text-xs font-semibold mr-3 text-main-text underline">View Bid</a>
                </div>
            </div>
        </li>
    );
};

export default CompanyItem;
