import React, { useEffect, useState } from 'react'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import {Table, Popconfirm } from 'antd';

const ApplicationsTable = ({ searchText, dataSource, handleEdit }) => {
   // const [data, setData] = useState([]);

  
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
           <CheckCircleFilled style={record.progress == 'Rejected' ? {color: '#FF3B30'} : (record.progress == 'Accepted' ? {color: '#51C080'} : {color: '#FFCE20'})}/>
           <p>{record.progress}</p>
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

  return(
  
  <Table dataSource={dataSource}  columns={columns} pagination={false}  />); 
};

export default ApplicationsTable;