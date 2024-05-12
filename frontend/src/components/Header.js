import React from 'react';
import {useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import {logout } from '../Requests';

const Header = ({title}) => {
    const navigate = useNavigate();
    const {setUserType} = useUser();
    const {setUserId} = useUser();
    
    return (
        <div className='h-16 bg-main-bg flex box-shadow shadow-sm flex-row items-center justify-between'>
          <p className='font-poppins font-bold text-white text-2xl p-4 ml-2 justify-start'>{title}</p>
          <button
            onClick={()=> logout(navigate, setUserType, setUserId)}
            className={`w-28 text-white text-sm py-2 rounded-xl hover:font-semibold flex justify-center h-10 mr-3`}
          >
            Logout
          </button>
        </div>
    );
};

export default Header