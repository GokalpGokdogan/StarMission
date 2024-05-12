import React, { useEffect, useState } from 'react'
import {Table } from 'antd';

const ApplicationsTable = ({ dataSource, handleEdit, columns }) => {
   // const [data, setData] = useState([]);

  return(
  
  <Table dataSource={dataSource}  columns={columns} pagination={{ pageSize: 3}} />); 
};

export default ApplicationsTable;