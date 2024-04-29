import React from 'react'

const BidModal = ({isVisible, onClose, children}) => {
    if(!isVisible) return null;

    const handleClose = (e) => {
        if( e.target.id === "wrapper" ) onClose();
    }

    return (
       <div className='fixed inset-0 bg-black bg-opacity-25 z-100
        backdrop-blur-sm flex justify-center items-center' id="wrapper" 
        onClick={handleClose}>
            <div className="w-[2000px] flex flex-col justify-center">
                <button className="text-white text-xl place-self-end" onClick=
                {() => onClose()}></button>
                <div className="flex-auto flex-col flex p-4 mb-10 ml-60 mr-60 mt-10 border rounded-xl border-transparent border-10 bg-white shadow-lg">{children}</div>
            </div>
        </div>
    );
};

export default BidModal