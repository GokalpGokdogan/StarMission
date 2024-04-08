import React from "react";
import AddDynamicInputFields from "../components/AddDynamicInputFields";

const CreateMission = () => {
    return(
        <div className="bg-home-bg">
            <div className="bg-white mt-5 py-2 border rounded-xl border-transparent p-2 border-10 py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-main-text">Create New Mission</h2>
                <form action="#">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-main-text">Mission Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Mission Name" required=""/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-main-text">Location</label>
                            <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Location" required=""/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-main-text">Start Date</label>
                            <input type="text" name="start-date" id="start-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="dd.mm.yyyy" required=""/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-main-text">End Date</label>
                            <input type="text" name="start-date" id="start-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="dd.mm.yyyy" required=""/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-main-text">Description</label>
                            <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Your description here"></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-main-text">Important Notes Prior to Undesirable Situations</label>
                            <AddDynamicInputFields />
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