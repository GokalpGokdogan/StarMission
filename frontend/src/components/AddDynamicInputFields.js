import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function AddDynamicInputFields({ inputs, setInputs }) {

    const handleAddInput = () => {
        setInputs([...inputs, { id: uuidv4(), note: "" }]);
    };

    const handleChange = (event, id) => {
        let { name, value } = event.target;
        let onChangeValue = inputs.map(input =>
            input.id === id ? { ...input, [name]: value } : input
        );
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (id) => {
        const newArray = inputs.filter(input => input.id !== id);
        setInputs(newArray);
    };

    return (
        <div className="w-full">
            {inputs.map((item) => (
                <div key={item.id}>
                    <div className="flex items-center mb-2">
                        <input
                            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            name="note"
                            type="text"
                            value={item.note}
                            onChange={(event) => handleChange(event, item.id)}
                        />
                        {inputs.length > 1 && (
                            <svg onClick={() => handleDeleteInput(item.id)} className="h-6 w-6 text-button-red transition-colors duration-300 hover:text-red-600 hover:scale-105 cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                                <path stroke="none" d="M0 0h24v24H0z"/>  
                                <line x1="4" y1="7" x2="20" y2="7" />  
                                <line x1="10" y1="11" x2="10" y2="17" />  
                                <line x1="14" y1="11" x2="14" y2="17" />  
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        )}
                    </div>
                    <div>
                        {item.id === inputs[inputs.length - 1].id && (
                            <svg onClick={() => handleAddInput()} className="h-8 w-8 text-button-purple cursor-pointer transition-colors duration-300 hover:scale-105 ease-in-out hover:text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddDynamicInputFields;
