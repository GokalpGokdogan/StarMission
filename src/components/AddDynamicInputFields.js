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
                            <button onClick={() => handleDeleteInput(index)} className="ml-2">Delete</button>
                        )}
                    </div>
                    <div>
                        {index === inputs.length - 1 && (
                            <button onClick={() => handleAddInput()} className="ml-2">Add</button>
                        )}
                    </div>
                </div>
            ))}
            <div className="body"> {JSON.stringify(inputs)} </div>
        </div>

    );
}

export default AddDynamicInputFields