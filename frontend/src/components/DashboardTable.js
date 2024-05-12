import React, { useState, useEffect } from "react";
import ApplicationsTable from "./ApplicationsTable";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';

const DashboardTable = ({data, showHeader, searchText}) => {

  const[dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    console.log(data);
    let tempData = [];
    for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const formattedDate = new Date(item.bid_date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');
    tempData.push({
      key: `${i + 1}`,
      name: item.name,
      progress: item.bid_status === 'In Progress' ? 'In progress' : item.bid_status,
      amount: item.requested_amount + " TL",
      date: formattedDate,
    });
    }
    setDataSource(tempData);
    console.log(tempData);
  }, [data]);

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
            {record.progress === 'Rejected' ? (
              <CancelIcon style={{ color: '#FF3B30', fontSize: '20px' }} />
            ) : record.progress === 'Accepted' ? (
              <CheckCircleIcon style={{ color: '#51C080', fontSize: '20px' }} />
            ) : (
              <PendingIcon style={{ color: '#FFCE20', fontSize: '20px' }} />
            )}
            <p>{record.progress}</p>
          </div>
        </>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];


  return (
    <div className="w-full h-full">
     { showHeader ? 
     ( <ul className="flex-auto flex-col flex p-3 border rounded-xl border-transparent border-10 bg-grey-bg shadow-lg h-full min-h-64">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-main-text font-semibold px-2 mb-4">My Bids</h2>
        </div>
          <ApplicationsTable dataSource={dataSource.slice(0, 3)} columns={columns} />

      </ul>) :
      (   <ApplicationsTable dataSource={dataSource} columns={columns} />
    )
      }
    </div>
  )
};

export default DashboardTable