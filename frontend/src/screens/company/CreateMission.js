import React, { useEffect, useState } from "react";
import AddDynamicInputFields from "../../components/AddDynamicInputFields";
import { createMission } from "../../Requests";
import Header from '../../components/Header';
import { useUser } from "../../UserProvider";

const CreateMission = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [important_notes, setImportantNotes] = useState('');
    const [inputs, setInputs] = useState([{ note: "" }]);
    const {userId} = useUser();

    const getJoinedString = () => {
        // Extract values efficiently using map
        const values = inputs.map((item) => item.note);
        console.log("values " + values);
        return values.join('$$$$'); // Consistent delimiter usage
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    useEffect(() => {
        console.log(inputs);
        const joinedString = getJoinedString();
        setImportantNotes(joinedString);
    }, [inputs]);

    return (
        <div className="bg-home-bg">
            <Header title={"Create Mission"}/>
            <div className="bg-white mt-5 py-2 border rounded-xl border-transparent p-2 border-10 py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-main-text">Create New Mission</h2>
                <form onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission behavior
                    createMission(userId, name, location, start_date, end_date, description, 0, important_notes);
                }}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-main-text">Mission Name</label>
                            <input value={name} onChange={handleNameChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Mission Name" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-main-text">Location</label>
                            <input value={location} onChange={handleLocationChange} type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Location" required="" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-main-text">Start Date</label>
                            <input value={start_date} onChange={handleStartDateChange} type="text" name="start-date" id="start-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="dd.mm.yyyy" required="" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-main-text">End Date</label>
                            <input value={end_date} onChange={handleEndDateChange} type="text" name="start-date" id="start-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="dd.mm.yyyy" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-main-text">Description</label>
                            <textarea value={description} onChange={handleDescriptionChange} id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Your description here"></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-main-text">Important Notes Prior to Undesirable Situations</label>
                            <AddDynamicInputFields inputs={inputs} setInputs={setInputs} />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button type="submit" className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold transition-colors duration-300 ease-in-out hover:bg-indigo-700 hover:text-gray-100 hover:shadow-lg`}>
                            Post Mission
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateMission