import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

export const getUserType = () => {
    return Cookies.get('user_type');
}
export const getUserId = () => {
    return Cookies.get('user_id');
}

export const parseUserString = (userString) => {
    const userKeyValuePairs = userString.split(';');

    const userObject = {};

    for (const pair of userKeyValuePairs) {
        const [key, value] = pair.trim().split('=');
        userObject[key] = value;
    }

    return userObject;
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(Cookies.get('user_type'));
    const [userId, setUserId] = useState(Cookies.get('user_id'));

    return (
        <UserContext.Provider value={{ userType, setUserType, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext;
