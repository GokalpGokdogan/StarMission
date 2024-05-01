import React, { useEffect, useRef, useState } from 'react';

const CompanyListModal = ({ isVisible, onClose, children }) => {
    const [modalHeight, setModalHeight] = useState(0);
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            const height = modalRef.current.offsetHeight;
            setModalHeight(height);
        }
    }, [children]);

    const handleClose = () => {
        onClose(); // Simply call onClose to close the modal
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 z-100 backdrop-blur-sm flex justify-center items-center' id="wrapper">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl w-full mx-auto" ref={modalRef}>
                <button className="text-main-text text-2xl absolute top-0 right-0 mr-1 mt-1 mb-1" onClick={handleClose}>X</button>
                <div className="flex flex-col p-4 mb-10 border rounded-xl border-transparent border-10 bg-white shadow-lg overflow-hidden">
                    <div className="overflow-auto" style={{ minHeight: '40vh', maxHeight: `calc(90vh - ${modalHeight}px)` }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyListModal;
