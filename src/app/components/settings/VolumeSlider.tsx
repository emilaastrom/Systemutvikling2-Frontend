import React, { useState } from "react";

const VolumeControl = () => {
  // Initialize the state with `useState`
  const [volumeValue, setVolumeValue] = useState(50);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state with the new volume value from the slider
    const newValue = parseInt(event.target.value); // Convert the value to a number
    if (event.target.value === "" || isNaN(newValue)) {
      setVolumeValue(0); // Set volume to 0 if input is empty or not a number
    } else if (newValue >= 0 && newValue <= 100 && !isNaN(newValue)) {
      // Ensure the value is a number within the range 0-100 before updating state
      setVolumeValue(newValue);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="dark:text-white text-center">
        Volum på lydeffekter:
        <input
          type="text"
          value={volumeValue}
          onChange={handleSliderChange}
          className="ml-1 w-12 border-2 rounded-lg border-green-400 dark:bg-slate-200 dark:border-slate-500 dark:text-black shadow-sm text-center"
          placeholder="Sett volum (0-100)"
        />
        %
        <div className="md:w-1/3 w-fill pr-8 py-2">
          <style>
            {`
        #volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 25px; /* Width of the handle */
          height: 25px; /* Height of the handle */
          background: #ffffff;
          border: 2px solid #5F8575;
          cursor: pointer;
          border-radius: 50%; /* Circular shape */
        }
        #volume-slider::-moz-range-thumb {
          width: 25px;
          height: 25px;
          background: #ffffff;
          border: 2px solid #5F8575;
          cursor: pointer;
          border-radius: 50%;
        }
        #volume-slider::-ms-thumb {
          width: 25px;
          height: 25px;
          background: #ffffff;
          border: 2px solid #5F8575;
          cursor: pointer;
          border-radius: 50%;
        }
      `}
          </style>
          <input
            type="range"
            id="volume-slider"
            className="appearance-none w-64 h-3 bg-gray-300 dark:bg-gray-700 rounded-md"
            min="0"
            max="100"
            value={volumeValue}
            step={5}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
