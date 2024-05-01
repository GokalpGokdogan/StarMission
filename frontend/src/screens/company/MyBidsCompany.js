import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import ApplicationsTable from '../../components/ApplicationsTable';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from '../../components/SearchBar';
import DashboardTable from '../../components/DashboardTable';
import { useUser } from '../../UserProvider';
import { getMyBids } from '../../Requests';

const MyBidsCompany = () => {

  const {userId} = useUser();
  const [searchText, setSearchText] = useState('');
  const [myBids, setMyBids] = useState([]);


  const fetchMyBids = async () => {
    try{
        const bids = await getMyBids(userId);
        if(bids == "No bids found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setMyBids(bids);
          console.log(bids);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

useEffect(() => {
    fetchMyBids();
}, []);


  return (
    <div className="flex flex-col h-screen">
      <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
        <p className='font-poppins font-bold text-white text-2xl p-4 ml-2'>My Bids</p>
      </div>
      <div className="flex-1 bg-home-bg flex flex-col items-center gap-4 p-8">
        <SearchBar input={searchText} onChange={(e) => setSearchText(e.target.value)}></SearchBar>
        <div className="shadow-lg w-2/3 h-full">
            <DashboardTable data={myBids} showHeader={false}/>        
        </div>
      </div>
    </div>
  );
};


export default MyBidsCompany;