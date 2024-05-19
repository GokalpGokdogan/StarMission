import React, { useEffect, useState } from 'react';
import MissionApplicant from "../../components/MissionApplicant";
import { useParams, NavLink } from "react-router-dom";
import { getCompanyData, editAstronautProfile, getAstronautData,getImageById } from "../../Requests";
import Header from '../../components/Header';
import { useUser } from '../../UserProvider';
import { Avatar } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const EditProfileAstronaut = () => {

  const { userId } = useUser();
  const [astronautInfo, setAstronautInfo] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [description, setDescription] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [url, setUrl] = useState(''); 


  const fetchAstronautInfo = async () => {
    try {
      const info = await getAstronautData(userId);
      if (info == "No applications found with these filters") {
        console.log("ahah")
      }
      else {
        setAstronautInfo(info);
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
    fetchAstronautInfo();
  }, []);

  
  useEffect(() => {
    setUrl(astronautInfo.image_url);
    setPhone(astronautInfo.phone);
    setProfession(astronautInfo.profession);
    setDescription(astronautInfo.description);
    setAddress(astronautInfo.address);
    setHeight(astronautInfo.height);
    setWeight(astronautInfo.weight);
  }, [astronautInfo]);


  const handleSubmit = async (e) => {
       e.preventDefault();
      try{
        const mis = await editAstronautProfile(userId, astronautInfo.name, astronautInfo.email, phone, 
          astronautInfo.password, address, astronautInfo.birth_date, weight,height, description, astronautInfo.sex, profession, astronautInfo.nationality, url); 
         /*  console.log(userId, astronautInfo.name, astronautInfo.email, phone, 
            astronautInfo.password, address, astronautInfo.birth_date, weight,height, description, astronautInfo.sex, profession, astronautInfo.nationality, url);*/

        setAlertText('Profile edited successfully! Redirecting to View Profile page...');
        setShowAlert(true);
        console.log("aha");
         setTimeout(() => {
            window.location.href = '/profile-astronaut';
        }, 2000);

        /* console.log(mis);     */
    } catch (error){
      setAlertText('An error occured.');
      setShowAlert(true);
        console.error('Error:', error);
    }
  };

  return (
    <div className="bg-home-bg min-h-screen">
      <Header title={"Edit Profile"} />

      <div className="flex justify-center">
        <div className="flex flex-col justify-center" style={{ width: '1600px', minHeight: '250px' }}>
          <div className='flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg'>
            <div className="flex items-center ml-8 mt-8 gap-4">
              <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={url} />
              <div>
                <h2 className="text-3xl font-bold text-main-text mt-5">{astronautInfo.name}</h2>
                <p className="break-all text-md leading-5 font-medium text-sub-text">{astronautInfo.email}</p>
                <input type="text" name="name" value={`${phone ? phone : ''}`} onChange={(e)=>{setPhone(e.target.value)}} id="name" className="bg-grey-bg w-64 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 mr-10" placeholder="Edit phone number" ></input>
              </div>
            </div>
            <div>
            <p className="text-lg font-semibold leading-5 mt-4 ml-10 mr-3 text-main-text">Profession</p>
            <input type="text" name="name" value={`${profession ? profession : ''}`} onChange={(e)=>{setProfession(e.target.value)}} id="name" className="bg-grey-bg w-64 mt-4 ml-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 mr-10" placeholder="Edit profession" ></input>
            </div>
            <p className="text-lg font-semibold leading-5 mt-4 ml-10 mr-3 text-main-text">Description</p>
            <textarea
              type="description"
              placeholder="Enter description"
              value={description}
              className="flex flex-col border bg-grey-bg mt-4 h-32 rounded-lg p-2 resize-none"
              row={3}
              onChange={(e)=>setDescription(e.target.value)}
            />
            <p className="text-lg font-semibold leading-5 mt-4 ml-10 mr-3 text-main-text">Address</p>
            <input type="text" name="name" value={`${address ? address : ''}`} onChange={(e)=>{setProfession(e.target.value)}} id="name" className="bg-grey-bg mt-4 ml-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 mr-10" placeholder="Edit address" ></input>
            <div className='flex flex-row justify-between'>
              <div>
                <p className="text-xl font-semibold leading-5 mt-8 ml-10 mr-3 text-main-text">Weight (kg)</p>
                <input type="text" name="name" value={`${weight ? weight : ''}`} onChange={(e)=>{setWeight(e.target.value)}} id="name" className="bg-grey-bg mt-4 ml-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 mr-10" placeholder="Edit weight" ></input>

              </div>
              <div>
                <p className="text-xl font-semibold leading-5 mt-8 mr-3 text-main-text">Height (cm)</p>
                <input type="text" name="name" value={`${height ? height : ''}`} onChange={(e)=>{setHeight(e.target.value)}} id="name" className="bg-grey-bg mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 mr-10" placeholder="Edit height" ></input>
                <div>
              </div>
              </div>
            </div>
            <p className="text-xl font-semibold leading-5 mt-8 ml-8 text-main-text">Profile url:</p>
                <input type="text" name="name" value={`${url ? url : ''}`} onChange={(e)=>{setUrl(e.target.value)}} id="name" className="ml-8 bg-grey-bg w-64 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 mr-10" placeholder="Edit url" ></input>
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
              <Alert severity={alertText.includes('successful') ? 'success' : 'error'} className="w-full">
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

export default EditProfileAstronaut;