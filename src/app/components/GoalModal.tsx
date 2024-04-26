import React from 'react';

const NewGoalModal = ({ closeModal }) => {
  return (
    <div className="modal-container flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create New Goal</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md mr-2"
            onClick={closeModal}
          >
            Close
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGoalModal;
