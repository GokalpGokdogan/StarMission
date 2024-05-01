import React from "react";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({input, onChange}) => {
    return (
        <div className="relative">
            <div className="flex items-center">
                <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 hover:scale-110' style={{color: '#140D3B'}} />
                <input type="text" id="search-input" value={input} onChange={onChange} style={{ width: '654px', height: '48px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} placeholder="Search..." className="py-2 pl-10 pr-2 border border-gray-300 rounded-full focus:outline-none" />
            </div>
        </div>
    )
}

export default SearchBar