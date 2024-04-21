import React from "react";
import ApplicationsTable from "./ApplicationsTable";

const DashboardTable = () =>{

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
        <div className="w-full">
            <ul className="flex-auto flex-col flex p-4 border rounded-xl border-transparent border-10 bg-grey-bg shadow-lg h-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-main-text font-semibold px-2 mb-4">My Bids</h2>
                </div>
                <ApplicationsTable dataSource={dataSource} columns={columns}/>

            </ul>
        </div>
    )
};

export default DashboardTable