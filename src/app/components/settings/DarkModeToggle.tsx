import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="py-2">
      <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer">
        <div className="mr-2 text-gray-700 font-medium">
        Mørk modus: 
        </div>
        <div className="relative">
          <input 
            id="dark-mode-toggle" 
            type="checkbox" 
            className="sr-only" 
            checked={darkMode} 
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <div className="block bg-gray-100 border-2 border-gray-200 w-14 h-8 rounded-full"></div>
          <div className={`dot absolute left-1 top-1 bg-white border-green-500 border-2 w-6 h-6 rounded-full transition-transform ${darkMode ? 'transform translate-x-6' : ''}`}></div>
        </div>
      </label>
    </div>
  );
};

export default DarkModeToggle;