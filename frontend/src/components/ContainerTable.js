import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

const ContainerTable = ({columnNames, data}) => {

    const[cols, setCols] = useState([]);

    let tempCols = [];
    columnNames.forEach((item) => {
        tempCols.push({
            title: item,
            dataIndex:item,
            key:item,
          })
    });

    let tempData = [];
    columnNames.forEach((item) => {
        tempData.push({
            title: item,
            dataIndex:item,
            key:item,
          })
    });

useEffect(() => {setCols(tempCols); 
    console.log(data); }, []);

const numberOfRows = data[0].length;

const dataSource = [];

for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    let rowObject = {};
    columnNames.forEach((columnName, colIndex) => {
        rowObject[columnName] = data[colIndex][rowIndex];
    });
    dataSource.push(rowObject);
}

console.log(dataSource);

  return (
     <Table dataSource={dataSource}  columns={cols} ></Table> 
  )
}

export default ContainerTable