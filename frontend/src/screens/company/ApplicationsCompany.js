import React, { useState, useEffect } from 'react';
import {Link, Route} from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import SingleApplication from '../../components/SingleApplication'
import { getApplications } from '../../Requests';
import { useUser } from '../../UserProvider';
const ApplicationsCompany = () => {
  const {userId} = useUser();
  const [applications, setApplications] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [searchText, setSearchText] = useState(null);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); 
  };

  const fetchApplications = async () => {
    try{
        const apps = await getApplications(userId, searchText, null, null, null, null, null, null, null, null, null, null);
        if(apps == "No applications found with these filters")
        {
          console.log("ahah")
        }
        else
        {
          setApplications(apps);
          console.log(apps);
        }
        
    } catch (error){
        console.error('Error fetching apps:', error);
    }
};

    useEffect(() => {
      fetchApplications();
  }, [searchText]);

  return (
    <div className="bg-home-bg h-full">
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm'>
            <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>Applications</p>
        </div>
        <div class="flex justify-center mt-6 mb-12">
          <SearchBar input={searchText} onChange={handleSearchChange} />
        </div>
        <div>
        {applications && applications.map(application => (  
              <SingleApplication
                application={application}
              />
            ))}
        </div>
    </div>
  );
};
export default ApplicationsCompany;