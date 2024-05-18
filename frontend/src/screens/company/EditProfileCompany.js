import React, { useEffect, useState } from 'react';
import MissionApplicant from "../../components/MissionApplicant";
import { useParams, NavLink } from "react-router-dom";
import { getCompanyData, editCompanyProfile } from "../../Requests";
import Header from '../../components/Header';
import { useUser } from '../../UserProvider';
import { Avatar } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const EditProfileCompany = () => {

  const { userId } = useUser();
  const [companyInfo, setCompanyInfo] = useState([]);
  const [foundation_date, setFoundationDate] = useState(companyInfo?.foundation_date);
  const [description, setDescription] = useState(companyInfo?.description);
  const [balance, setBalance] = useState(companyInfo?.balance);
  const [url, setUrl] = useState(companyInfo?.image_url);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const fetchCompanyInfo = async () => {
    try {
      const info = await getCompanyData(userId);
      if (info == "No applications found with these filters") {
        console.log("ahah")
      }
      else {
        setCompanyInfo(info);
        console.log(info);
      }

    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };
  

  const formatDate = (date) => {
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    return day + "." + month + "." + year;
  }

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    setBalance(companyInfo.balance);
    setFoundationDate(companyInfo.foundation_date);
    setDescription(companyInfo.description);
    setUrl(companyInfo.image_url);
  }, [companyInfo]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const mis = await editCompanyProfile(userId, companyInfo.name, companyInfo.email, companyInfo.phone, 
          companyInfo.password, foundation_date, description, 
          balance, url);

        setAlertText('Profile edited successfully! Redirecting to View Profile page...');
        setShowAlert(true);
        console.log("aha");
        setTimeout(() => {
            window.location.href = '/profile-company';
        }, 2000);

        console.log(mis);    
    } catch (error){
        console.error('Error firing the employee:', error);
    }
  };

  return (
    <div className="bg-home-bg min-h-screen">
      <Header title={"Edit Profile"} />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <div className="flex items-center ml-8 mt-8 gap-4">
              <Avatar sx={{ width: 56, height: 56, zIndex: 0 }} alt="Remy Sharp" src={companyInfo.image_url} />
              <div>
                <h2 className="text-3xl font-bold text-main-text mt-5">{companyInfo.name}</h2>
                <div className='flex flex-row gap-2 items-center'>
                  <p className="text-md font-medium leading-5 text-sub-text">Foundation date:</p>
                  <input type="text" name="name" value={`${foundation_date ? /* formatDate( */foundation_date/* ) */ : ''}`} id="name" 
                  className="bg-grey-bg w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" 
                  placeholder="Edit foundation date" onChange={(e)=>setFoundationDate(e.target.value)}></input>
                </div>
              </div>
            </div>
            <p className="text-xl font-semibold leading-5 mt-12 ml-10 mr-3 text-main-text">Company Description</p>
            <textarea
              type="description"
              placeholder="Enter description"
              value={description}
              className="flex flex-col border bg-grey-bg mt-4 h-32 rounded-lg p-2 resize-none"
              row={3}
              onChange={(e)=>setDescription(e.target.value)}
            />
            <div className='flex flex-row justify-between'>
              <div>
                <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Balance ($)</p>
                <input type="text" name="name" value={`${balance ? balance : ''}`} onChange={(e)=>{setBalance(e.target.value); console.log(e.target.value)}} id="name" className="bg-grey-bg ml-10 mt-4 w-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" placeholder="Edit budget"></input>
              </div>
              <div>
                <p className="text-xl font-semibold leading-5 mt-8 mr-3 text-main-text">Profile url:</p>
                <input type="text" name="name" value={`${url ? url : ''}`} onChange={(e)=>{setUrl(e.target.value)}} id="name" className="bg-grey-bg w-64 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 mr-10" placeholder="Edit foundation date" ></input>
              </div>
            </div>
            <div className="flex justify-end mr-8 mt-16 mb-4">
                <button type="button" className=" bg-button-purple text-white text-sm px-2 py-3 rounded-xl" onClick={handleSubmit}>
                  Submit Changes
                </button>
              </div>
          </div>
        </div>
      </div>
      {showAlert && (
          <div className={`fixed bottom-4 right-4 max-w-96 flex ${alertText.length > 40 ? 'flex-col items-end justify-center' : 'flex-row items-center'}`}>
              <Alert severity={'success'} className="w-full">
                  <div className="flex items-center justify-between w-full">
                      <div>{alertText}</div>
                      <IconButton onClick={() => setShowAlert(false)}>
                          <CloseIcon />
                      </IconButton>
                  </div>
              </Alert>
          </div>
        )}
    </div>
  );
};

export default EditProfileCompany;