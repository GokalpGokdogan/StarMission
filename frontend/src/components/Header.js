import React from 'react';
import {useNavigate, NavLink } from 'react-router-dom';
import { useUser } from '../UserProvider';
import {logout } from '../Requests';

const Header = ({title}) => {
    const navigate = useNavigate();
    const {setUserType} = useUser();
    const {setUserId} = useUser();
    const {userType} = useUser();
    
    return (
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm flex-row items-center justify-between'>
          <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>{title}</p>
          
          <div className='flex flex-row gap-2 items-center'>    
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
              className={`w-28 text-white text-sm py-2 rounded-xl hover:font-semibold flex justify-center h-10 mr-3`}
            >
              Logout
            </button>
          </div>  
        </div>
    );
};

export default Header