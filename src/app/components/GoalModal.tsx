import React from 'react';
import InputBox from './settings/InputBox';

const NewGoalModal = ({ closeModal }) => {

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-container flex justify-center items-center" onClick={closeModal}>
      <div className="modal-content bg-white p-6 rounded-lg shadow-md" onClick={handleContentClick}>
        <h2 className="text-2xl font-bold mb-4 text-center">Lag et nytt sparemål</h2>
        <div className="mb-4 flex justify-center">
          <InputBox label='Tittel' placeholder='f.eks. "Ny mobil"'/>
        </div>
        <div className="mb-4 flex justify-center">
          <InputBox label='Hvor mye koster det?' placeholder='3000'/>
        </div>
       
        <div className="flex justify-center">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className="bg-primary-dark hover:bg-primary-light text-white px-4 py-2 rounded-md">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGoalModal;
