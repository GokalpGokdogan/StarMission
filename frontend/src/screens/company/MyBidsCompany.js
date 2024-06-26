import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import ApplicationsTable from '../../components/ApplicationsTable';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from '../../components/SearchBar';
import DashboardTable from '../../components/DashboardTable';
import { useUser } from '../../UserProvider';
import { getMyBids } from '../../Requests';
import Header from '../../components/Header';
import CircularProgress from '@mui/material/CircularProgress';

const MyBidsCompany = () => {

  const {userId} = useUser();
  const [searchText, setSearchText] = useState('');
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);


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
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
};

useEffect(() => {
    fetchMyBids();
}, []);


  return (
    <div className="flex flex-col h-screen">
      <Header title={"My Bids"}/>
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
        <div className="text-center mt-32">
          <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
          <p>Loading data...</p>
        </div>
      </div>
      ) : (
      <div className="flex-1 bg-home-bg flex flex-col items-center gap-4 p-8">
        <SearchBar input={searchText} onChange={(e) => setSearchText(e.target.value)}></SearchBar>
        <div className="shadow-lg w-2/3 h-full">
            <DashboardTable data={myBids} showHeader={false} searchText={searchText}/>        
        </div>
      </div>)}
    </div>
  );
};


export default MyBidsCompany;