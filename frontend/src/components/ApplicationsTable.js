import React, { useEffect, useState } from 'react'
import {Table, Popconfirm } from 'antd';

const ApplicationsTable = ({ searchText, dataSource, handleEdit, columns }) => {
   // const [data, setData] = useState([]);

  return(
  
  <Table dataSource={dataSource}  columns={columns} pagination={false}  />); 
};

export default ApplicationsTable;