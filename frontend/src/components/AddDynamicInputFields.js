import { useState } from "react";

function AddDynamicInputFields() {
    const [inputs, setInputs] = useState([{ note: ""}]);

    const handleAddInput = () => {
        setInputs([...inputs, { note: ""}]);
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (event, index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };


    return (
        <div className="w-full">
            {inputs.map((item, index) => (
                <div key={index}>
                    <div className="flex items-center mb-2">
                        <input
                            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            name="note"
                            type="text"
                            value={item.note}
                            onChange={(event) => handleChange(event, index)}
                        />
                        {inputs.length > 1 && (
                            <svg onClick={() => handleDeleteInput(index)} className="h-6 w-6 text-button-red transition-colors duration-300 hover:text-red-600 hover:scale-105 cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        )}
                    </div>
                    <div>
                        {index === inputs.length - 1 && (
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

export default AddDynamicInputFields