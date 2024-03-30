import React, { useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons';
import {Table, Popconfirm } from 'antd';

const ApplicationsTable = ({ searchText, personbanks, handleEdit }) => {
   // const [data, setData] = useState([]);

   const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },

  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text, record, index) => (
        <>
            <button
                onClick={() => handleEdit(record)}
                className=" text-primary-bright dark:text-dark-primary-bright rounded-2xl text-sm py-1 px-4"
            >
                <EditOutlined className='mr-2' /> Edit
            </button>
          
        </>
    )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return(
  
  <Table dataSource={dataSource}  columns={columns} pagination={false}  />); 
};

export default ApplicationsTable;