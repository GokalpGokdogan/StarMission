import React, { useEffect, useState } from 'react'
import {Table } from 'antd';

const ApplicationsTable = ({ searchText, dataSource, handleEdit, columns }) => {
   // const [data, setData] = useState([]);

  return(
  
  <Table dataSource={dataSource}  columns={columns} pagination={false} searc />); 
};

export default ApplicationsTable;