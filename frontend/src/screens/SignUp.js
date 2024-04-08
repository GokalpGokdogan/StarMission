import React, { useEffect, useState } from 'react';
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { registerAstronaut, registerCompany } from '../Requests';


const SignUp = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [isCompany, setIsCompany] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nationality, setNationality] = useState('Select Country');
    const [phoneCode, setPhoneCode] = useState('+1'); // Default phone code
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sex, setSex] = useState('Select Gender');
    const [showNamePlaceholder, setShowNamePlaceholder] = useState(true);
    const [showEmailPlaceholder, setShowEmailPlaceholder] = useState(true);
    const [showPasswordPlaceholder, setShowPasswordPlaceholder] = useState(true);

    const [countriesList, setCountriesList] = useState([]);
    const [countriesPhoneList, setCountriesPhoneList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result);
            setCountriesPhoneList([...new Set(result.map(country => country.phone_code))]);
        });
    }, []);

    useEffect(() => {
        let formattedPhone = phoneCode + phoneNumber.replace(/\D/g, '');
        setPhone(formattedPhone);
    }, [phoneNumber, phoneCode]);

    useEffect(() => {
       checkBirthday();
    }, [birthday]);

    countriesPhoneList.sort((a, b) => a - b);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setShowNamePlaceholder(e.target.value === '');
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setShowEmailPlaceholder(e.target.value === '');
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        // Validate phone number format??
    };

    const handlePhoneCodeChange = (e) => {
        setPhoneCode(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowPasswordPlaceholder(e.target.value === '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add sign up functionality here
    };


    const handleCountryChange = (e) => {
        setNationality(e.target.value);
        console.log(e.target.value);
    }

    const handleBirthdayChange = (e) => {
        console.log(e.target.value)
        setBirthday(e.target.value);
    }

    const handleGenderChange = (e) => {
        console.log(e.target.value)
        setSex(e.target.value);
    }

    const checkBirthday = () => {
        let dateArray = birthday.split(".");
        let newDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
        const day = parseInt(dateArray[0], 10);
        const month = parseInt(dateArray[1], 10) - 1;
        const year = parseInt(dateArray[2], 10);
      
        // Check if the day component is valid for the given month and year
        if (day > 0 && day <= new Date(year, month + 1, 0).getDate()) {
            const date = new Date(`${newDate}T00:00:00Z`); // Set time zone offset to 0
      
            // Check if the constructed Date object is valid
            if (
                date.getUTCFullYear() === year &&
                date.getUTCMonth() === month &&
                date.getUTCDate() === day
            ) {
                setBirthDate(newDate); // Set birthdate in yyyy-mm-dd format
                return 1; // Valid date
            }
        }
      
        return 0; // Invalid date
    }  

    const checkEmail = () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 1;
        } else {
            return 0;
        }
    }

    const checkPassword = () => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(password)) {
            return 1;
        } else {
            return 0;
        }
    }

    const handleRegisterCompany = async () => {
        let validEmail = checkEmail();
        let validBirthDate = checkBirthday(); 
        let validPassword = checkPassword();
        
        if (validEmail == 0)
        {
            setAlertText('Invalid email address');
            setShowAlert(true);
            return;
        }
        else if(validPassword == 0)
        {
            setAlertText('Your password should have min. 8 characters, must contain at least one uppercase, lowercase, number, and special character.');
            setShowAlert(true);
            return;
        }
        
        setShowAlert(false);
        try {
            await registerCompany(name, email, phone, password);
            setAlertText('Registration successful! Redirecting to login...');
            setShowAlert(true);
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data === 'ERROR_EMAIL_EXISTS') {
                    setAlertText('Email already exists');
                } else {
                    setAlertText(error.response.data);
                }
            } else {
                setAlertText(error.message);
            }
            setShowAlert(true);
        }
    }

    const handleRegisterAstronaut = async () => {
        let validEmail = checkEmail();
        let validBirthDate = checkBirthday(); 
        let validPassword = checkPassword();
        
        if (validEmail == 0)
        {
            setAlertText('Invalid email address');
            setShowAlert(true);
            return;
        }
        else if(nationality == 'Select Country')
        {
            setAlertText('Select country');
            setShowAlert(true);
            return;
        }
        else if(validBirthDate == 0)
        {
            setAlertText('Invalid birth date');
            setShowAlert(true);
            return;
        }
        else if(sex == 'Select Gender')
        {
            setAlertText('Select gender');
            setShowAlert(true);
            return;
        }
        else if(validPassword == 0)
        {
            setAlertText('Your password should have min. 8 characters, must contain at least one uppercase, lowercase, number, and special character.');
            setShowAlert(true);
            return;
        }
        
        setShowAlert(false);
        try {
            await registerAstronaut(name, email, phone, nationality, birth_date, sex, password);
            setAlertText('Registration successful! Redirecting to login...');
            setShowAlert(true);
            setTimeout(() => {
                window.location.href = '/';
            }, 2000); 
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data === 'ERROR_EMAIL_EXISTS') {
                    setAlertText('Email already exists');
                } else {
                    setAlertText('An error occurred: ' + error.response.data);
                }
            } else {
                setAlertText('An error occurred: ' + error.message);
            }
            setShowAlert(true);
        }
    }

    return (
        <div className="flex items-center justify-center bg-main-bg h-full">
            <form onSubmit={handleSubmit} className="bg-main-bg p-8 rounded shadow-md flex flex-col justify-center w-full max-w-md">                <div className="flex items-center justify-center mb-4">
                <h2 className="text-6xl font-bold mt-4 mb-4 text-white">StarMission</h2>
            </div>
                <p className="text-white text-lg text-center">Sign Up!</p>
                <div className="mt-4 grid grid-cols-1 gap-x-6 text-center sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <p
                            className={`mt-2 hover:cursor-pointer text-sub-text border-b  border-b-sub-text ${!isCompany ? 'font-semibold text-white' : ''}`}
                            onClick={() => setIsCompany(false)}
                        >
                            Astronaut
                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <p
                            className={`mt-2 hover:cursor-pointer text-sub-text border-b border-b-sub-text ${isCompany ? 'font-semibold text-white' : ''}`}
                            onClick={() => setIsCompany(true)}
                        >
                            Company
                        </p>
                    </div>
                </div>
                {isCompany ?
                    (<div><div className="sm:col-span-3 mt-4">
                        <label htmlFor="name" className="mt-6 text-white text-sm">Name</label>
                        <input
                            type="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                            maxLength={255}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                    </div>
                        <label htmlFor="email" className="mt-2 text-white text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="mail@tubitak.com"
                            value={email}
                            onChange={handleEmailChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                        <label htmlFor="phone-number" className="mt-2 text-white text-sm">Phone Number</label>
                        <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-12">
                            <div className="sm:col-span-3">
                                <select
                                    id="country-code"
                                    name="country-code"
                                    value={phoneCode}
                                    onChange={handlePhoneCodeChange}
                                    className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                                >
                                    {countriesPhoneList.map((item, index) => (
                                        <option className="text-black" key={index} value={item}>
                                            +{item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-5">
                                <input
                                    type="phone-number"
                                    placeholder="123 456 7890"
                                    maxLength={14}
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                                />
                            </div>
                        </div>

                        <label htmlFor="password" className="mt-2 text-white text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Min. 8 characters"
                            value={password}
                            maxLength={100}
                            onChange={handlePasswordChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                        <label htmlFor="signup" className="mb-2 text-white text-sm">Already have an account? <Link to="/" className="text-blue-500">Login</Link></label>
                        <div className="flex items-center justify-center mb-4 mt-4">
                            <button type="submit" className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold`} onClick={handleRegisterCompany}>
                                Sign Up
                            </button>
                        </div> </div>) :
                    (<div><div className="sm:col-span-3 mt-4">
                        <label htmlFor="name" className="mt-6 text-white text-sm">Name</label>
                        <input
                            type="name"
                            placeholder="Name"
                            value={name}
                            maxLength={255}
                            onChange={handleNameChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                    </div>
                        <label htmlFor="email" className="mt-2 text-white text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="mail@tubitak.com"
                            value={email}
                            onChange={handleEmailChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                        <label htmlFor="phone-number" className="mt-2 text-white text-sm">Phone Number</label>
                        <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-12">
                            <div className="sm:col-span-3">
                                <select
                                    id="country-code"
                                    name="country-code"
                                    value={phoneCode}
                                    onChange={handlePhoneCodeChange}
                                    className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                                >
                                    {countriesPhoneList.map((item, index) => (
                                        <option className="text-black" key={index} value={item}>
                                            +{item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-5">
                                <input
                                    type="phone-number"
                                    placeholder="123 456 7890"
                                    value={phoneNumber}
                                    maxLength={14}
                                    onChange={handlePhoneNumberChange}
                                    className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                                />
                            </div>
                        </div>
                        <label htmlFor="country" className="mt-2 text-white text-sm">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={nationality}
                            onChange={handleCountryChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full "
                        >
                            <option className="text-black" defaultValue='0'>Select Country</option>
                            {countriesList.map((item, index) => (
                                <option className="text-black" key={index + 1} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="birth-date" className="mt-2 text-white text-sm">Birth Date</label>
                                <input
                                    type="birth-date"
                                    placeholder="dd.mm.yyyy"
                                    className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                                    maxLength={10}
                                    value={birthday}
                                    onChange={handleBirthdayChange}
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="gender" className="mt-2 text-white text-sm">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full "
                                    value={sex}
                                    onChange={handleGenderChange}
                                >
                                    <option className="text-black" defaultValue>Select Gender</option>
                                    <option className="text-black" >Woman</option>
                                    <option className="text-black" >Man</option>
                                    <option className="text-black" >Other</option>
                                    <option className="text-black" >Prefer Not to Say</option>
                                </select>
                            </div>
                        </div>
                        <label htmlFor="password" className="mt-2 text-white text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={handlePasswordChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                        <label htmlFor="signup" className="mb-2 text-white text-sm">Already have an account? <Link to="/" className="text-blue-500">Login</Link></label>
                        <div className="flex items-center justify-center mb-4 mt-4">
                            <button type="submit" className={`w-32 bg-button-purple text-white transition-colors duration-300 ease-in-out hover:bg-indigo-700 hover:text-gray-100 hover:shadow-lg py-2 rounded-lg font-bold`} onClick={handleRegisterAstronaut}>
                                Sign Up
                            </button>
                        </div> </div>

                    )
                }
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


            </form>
        </div>
    );
};


export default SignUp;