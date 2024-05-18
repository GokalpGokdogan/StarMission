import React, {useState, useEffect} from 'react';
import {useNavigate, NavLink } from 'react-router-dom';
import { useUser } from '../UserProvider';
import {getImageById, logout } from '../Requests';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';

const Header = ({title}) => {
    const navigate = useNavigate();
    const {setUserType} = useUser();
    const {setUserId} = useUser();
    const {userId} = useUser();
    const {userType} = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState(''); 

    const fetchImage = async () => {
        try{
            const mis = await getImageById(userId);

            setUrl(mis);
            console.log(mis);      
        } catch (error){
            console.error('Error fetching missions:', error);
        } 
    }

    useEffect(() => {
        fetchImage();
      }, []);


    
    return (
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm flex-row items-center justify-between'>
          <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>{title}</p>
          
          <div className='flex flex-row gap-4 items-center'>    
            {userType === "company" && 
            ( <NavLink
                  to={"/create-mission"}
                  className={`px-4 bg-button-purple text-white text-sm py-2 rounded-xl hover:bg-indigo-700 flex justify-center`}
              >
                + Create Mission
              </NavLink>)  
            }  
            <button
              onClick={()=> logout(navigate, setUserType, setUserId)}
              className={` text-white text-sm py-2 rounded-xl hover:font-semibold flex justify-center h-10 mr-3`}
            >
              Logout
            </button>
            <div className="relative">
            <div className='flex flex-row items-center mr-4'>
                <Avatar alt="Remy Sharp" src={url} onClick={()=>setIsOpen(!isOpen)} className='hover:cursor-pointer'/>
              <KeyboardArrowDownIcon style={{color:"#FFFF"}} className="text-white transition-transform duration-300 hover:scale-110 hover:cursor-pointer" onClick={()=>setIsOpen(!isOpen)} ></KeyboardArrowDownIcon>
            </div>
            {isOpen && (userType === "company" || userType === "astronaut" )
            && (
                <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-20">
                    <NavLink to={userType === "company" ? `/profile-company`: `/profile-astronaut`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        View Profile
                    </NavLink>
                    <NavLink to={userType === "company" ? `/edit-company-profile`: `/edit-astronaut-profile`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Edit Profile
                    </NavLink>
                </div>
            )}
        </div>
          </div>  
        </div>
    );
};

export default Header