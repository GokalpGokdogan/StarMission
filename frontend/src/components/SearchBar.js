import React from "react";

const SearchBar = ({input}) => {
    return (
        <div className="relative">
            <div className="flex items-center">
                <svg className="absolute top-0 left-0 w-6 h-6 mt-2 ml-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2M15 11a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <input type="text" id="search-input" style={{ width: '654px', height: '48px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} placeholder="Search..." className="py-2 pl-10 pr-2 border border-gray-300 rounded-full focus:outline-none" />
            </div>
        </div>
    )
}

export default SearchBar