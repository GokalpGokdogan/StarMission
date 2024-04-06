import React, { useEffect, useState } from 'react';
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { registerAstronaut, registerCompany } from '../Requests';


const SignUp = () => {
    const [isCompany, setIsCompany] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nationality, setNationality] = useState('0');
    const [phoneCode, setPhoneCode] = useState(''); // Default phone code
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [sex, setSex] = useState('');
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

    const handleBirthdateChange = (e) => {
        console.log(e.target.value)
        setBirthDate(e.target.value);
    }

    const handleGenderChange = (e) => {
        console.log(e.target.value)
        setSex(e.target.value);
    }

    const checkValidity = () => {
        if (/^\d{4}\-\d{2}\-\d{2}$/.test(birth_date)) {
            // If the format is correct, update the state
            console.log("yes");
        } else {
            // If the format is incorrect, do not update the state
            console.log("Invalid date format");
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
                                        <option className="text-black" key={index} value={index}>
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
                            onChange={handlePasswordChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                        <label htmlFor="signup" className="mb-2 text-white text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></label>
                        <div className="flex items-center justify-center mb-4 mt-4">
                            <button type="submit" className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold`} onClick={() => registerCompany(name, email, phoneNumber, password)}>
                                Sign Up
                            </button>
                        </div> </div>) :
                    (<div><div className="sm:col-span-3 mt-4">
                        <label htmlFor="name" className="mt-6 text-white text-sm">Name</label>
                        <input
                            type="name"
                            placeholder="Name"
                            value={name}
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
                                        <option className="text-black" key={index} value={index}>
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
                                    value={birth_date}
                                    onChange={handleBirthdateChange}
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
                        <label htmlFor="signup" className="mb-2 text-white text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></label>
                        <div className="flex items-center justify-center mb-4 mt-4">
                            <button type="submit" className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold`} onClick={() => registerAstronaut(name, email, phoneNumber, nationality, birth_date, sex, password)}>
                                Sign Up
                            </button>
                        </div> </div>

                    )

                }
                {/*{email !== 'oyku' && (
                    <Alert className='absolute top-4 right-4' severity="error">This is an error Alert.</Alert>
                )}*/}
            </form>
        </div>
    );
};


export default SignUp;