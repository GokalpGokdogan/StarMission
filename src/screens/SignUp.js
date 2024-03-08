import React, {useEffect, useState} from 'react';
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";
import {Link} from "react-router-dom";

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countryId, setCountryId] = useState(0);
    const [phoneCode, setPhoneCode] = useState(''); // Default phone code
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showFirstNamePlaceholder, setShowFirstNamePlaceholder] = useState(true);
    const [showLastNamePlaceholder, setShowLastNamePlaceholder] = useState(true);
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

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setShowFirstNamePlaceholder(e.target.value === '');
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setShowLastNamePlaceholder(e.target.value === '');
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
        setCountryId(e.target.value);
    }

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-main-bg p-8 rounded shadow-md flex flex-col justify-center w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <h2 className="text-6xl font-bold mt-4 mb-4 text-white">StarMission</h2>
                </div>
                <label htmlFor="email" className="mt-2 text-white text-lg text-center">Sign Up!</label>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="mt-6 text-white text-sm">First Name</label>
                        <input
                            type="first-name"
                            placeholder="First Name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="mt-6 text-white text-sm">Last Name</label>
                        <input
                            type="last-name"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
                        />
                    </div>
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
                    value = {countryId}
                    onChange={handleCountryChange}
                    className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full "
                >
                    <option value='0' className="text-black" defaultValue>Select Country</option>
                    {countriesList.map((item, index) => (
                        <option className="text-black" key={index+1} value={index+1}>
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
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="gender" className="mt-2 text-white text-sm">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full "
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
                    <button type="submit" className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold`}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};


export default SignUp;