import React, { useState, useEffect } from 'react';
import {Link, Route} from 'react-router-dom';
import SimpleList from '../../components/SimpleList';
import ApplicationsTable from '../../components/ApplicationsTable';
import DashboardTable from '../../components/DashboardTable';
import { getLeadingMissions, getApplications, getMyBids } from '../../Requests';
import { useUser } from '../../UserProvider';

//PASTMISSIONS COMPONENT SHRINKS IN EMPTY DATA ARRAY!!!!!!!!!!!!!

const DashboardCompany = () => {

  const {userId} = useUser();
  const [leadingMissions, setLeadingMissions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [myBids, setMyBids] = useState([]);

  const fetchMyBids = async () => {
    try{
        const bids = await getMyBids(userId);
        if(bids == "No applications found with these filters")
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


  const fetchLeadingMissions = async () => {
    try{
        const leading = await getLeadingMissions(userId);
        if(leading == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setLeadingMissions(leading);
          console.log(leading);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

  const fetchApplications = async () => {
      try{
          const apps = await getApplications(userId);
          if(apps == "No applications found with these filters")
          {
            console.log("ahah")
          }
          else
          {
            setApplications(apps);
            console.log(apps);
          }
          
      } catch (error){
          console.error('Error fetching apps:', error);
      }
  };

  useEffect(() => {
    fetchLeadingMissions();
    fetchApplications();
    fetchMyBids();
}, []);

const[searchText, setSearchText] = useState('');
const dataSource = [
    {
      key: '1',
      name: 'Asteroid',
      progress: 'Accepted',
      date: '10-02-2022',
    },
    {
      key: '2',
      name: 'Misyon',
      progress: 'Rejected',
      date: '10-02-2022',
    },
    {
      key: '3',
      name: 'Nehir Demir',
      progress: 'In progress',
      date: '10-02-2022',
    },

  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
          return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (text, record, index) => (
        <>
        <div className='flex flex-row gap-2'>
  {/*            <CheckCircleFilled style={record.progress == 'Rejected' ? {color: '#FF3B30'} : (record.progress == 'Accepted' ? {color: '#51C080'} : {color: '#FFCE20'})}/>
  */}           <p>{record.progress}</p>
            </div>
        </>
    ) 
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];


  return (
        <div className="bg-home-bg h-full">
            <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
                <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Dashboard</p>
            </div>
            <div className='p-4'>
            <div className=" grid grid-cols-2 grid-rows-2 gap-4">
                <div className="flex items-center justify-center">
                    <SimpleList title={"Leading Missions"} data={leadingMissions} type={'mission'}/>
                </div>
                <div className=" flex items-center justify-center">
                    <SimpleList title={"Applications"} data={applications} type={'application'}/>
                </div>                
                <div className="flex items-center justify-center shadow-">
                   <DashboardTable data={myBids}/>
                </div>
                <div className="flex items-center justify-center">
                    <SimpleList data={leadingMissions} />
                </div>

            </div>
            </div>
        </div>
  );
};


export default DashboardCompany;