import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getReportData } from '../../Requests';
import ContainerTable from '../../components/ContainerTable';
import Header from '../../components/Header';
import CircularProgress from '@mui/material/CircularProgress';

export const ReportDetails = () => {

    const { reportId } = useParams();
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState({});

    const fetchReportData = async () => {
      try{
          const report = await getReportData(reportId);
          if(report == "No applications found with these filters")
          {
            console.log("ahah")
          }
          else
          {
            setReportData(report);
            console.log(report);
          }
          
      } catch (error){
          console.error('Error fetching apps:', error);
      } finally{
        setTimeout(() => setLoading(false), 300);
      }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const formatContainerName = (contName) => {
    if (contName.startsWith("MostBudget")) {
        return "Missions with the Most Budget";
    }
    else if(contName.startsWith("MostPartnered"))
    {
        return "Missions with the Most Number of Partner Companies";
    }
    else if(contName.startsWith("ClosestEndTimeMissions"))
    {
        return "Missions with the Closest End Time";
    }
    else if(contName.startsWith("MostActiveMissionCompanies"))
    {
        return "Companies with the Most Number of Active Missions";
    }
    else if(contName.startsWith("MostPastMissionAstronauts"))
    {
        return "Astronauts with the Most Number of Past Missions";
    }  
}

    return (
        <div className="bg-home-bg min-h-screen">
            <Header title={"Report Details"}/>
            {loading ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center mt-32">
                <CircularProgress sx={{ color: "#635CFF" }} style={{ margin: '20px auto' }} size={50} color="primary" />
                <p>Loading data...</p>
              </div>
            </div>
            ) : (
            <div className="bg-white mt-5 border rounded-xl border-transparent p-2 border-10 px-4 mx-auto max-w-2xl py-8">
                <h2 className="mb-2 text-xl font-bold text-main-text">{reportData.report_name}</h2>
                <div className='flex flex-row gap-2'>
                    <p className="mb-4 text-md font-medium text-main-text">Creation Date:</p>
                    <p className="mb-4 text-md font-semibold text-sub-text">{new Date(reportData.creation_date).toLocaleDateString('en-GB', {day: '2-digit',month: '2-digit',year: 'numeric'}).replace(/\//g, '.')}</p>
                </div>
                    <div className="flex flex-col gap-4 ">
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-main-text">Description</label>
                            <div className="flex flex-col flex-grow min-w-0 mt-2 p-2 border rounded-xl border-transparent bg-grey-bg">
                                <p className="text-sm font-medium leading-6 text-main-text break-words">{reportData.description}</p>
                            </div>
                        </div>
                        { reportData.containers && reportData.containers.length > 0 ? (
                            reportData?.containers.map((value) => {
                                const columnData = Object.keys(value)
                                .filter(key => key.startsWith('column') && !key.endsWith('Data'))
                                .map(columnKey => ( value[columnKey]));

                                const data = Object.keys(value)
                                .filter(key => key.startsWith('column') && key.endsWith('Data'))
                                .map(columnKey => ( value[columnKey]));

                                return (
                                    <div >
                                        <label className="block mb-2 text-sm font-medium text-main-text">{formatContainerName( value.container_name ) }</label>
                                        <ContainerTable columnNames={columnData} data={data}></ContainerTable>         
                                    </div>
                                );

                            })) :
                            (<div></div>)
                        }
                    {/*     <div>
                            <label className="block mb-2 text-sm font-medium text-main-text">Data to Include in the Report</label>
                            <div className="flex flex-col mt-2 mb-6 gap-2">
                             
                            </div>
                        </div> */}
                    </div>
            </div>)}
        </div>
    )
}
