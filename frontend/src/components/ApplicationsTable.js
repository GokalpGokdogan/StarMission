import React, { useEffect, useState } from 'react'
import {Table } from 'antd';

const ApplicationsTable = ({ dataSource, columns }) => {

  return(
  
    <Table dataSource={dataSource}  columns={columns} pagination={{ pageSize: 3}} />); 
};

export default ApplicationsTable;