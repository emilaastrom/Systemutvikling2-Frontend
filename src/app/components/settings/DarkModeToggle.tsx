import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/app/components/settings/ThemeProvider";
import ThemeManager from "./ThemeManager";

const DarkModeToggle = () => {

  
  return (
    <div className="flex items-center mt-4">
      <ul className="items-center w-2/3 text-sm font-medium border-green-400 text-gray-900 bg-white border rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 overflow-hidden ">
          <label className="flex items-center ps-3 w-full cursor-pointer">
            <input
              id="horizontal-list-radio-license"
              type="radio"
              value="light"
              name="list-radio"
              onChange={() => ThemeManager.setTheme('light')}
              className="w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <span className="ms-2 py-3 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              Lys modus
            </span>
          </label>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <label className="flex items-center ps-3 w-full cursor-pointer">
            <input
              id="horizontal-list-radio-id"
              type="radio"
              value="dark"
              name="list-radio"
              onChange={() => ThemeManager.setTheme('dark')}
              className="w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <span className="ms-2 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Mørk modus
            </span>
          </label>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <label className="flex items-center ps-3 w-full cursor-pointer">
            <input
              id="horizontal-list-radio-military"
              type="radio"
              value="auto"
              name="list-radio"
              onChange={() => ThemeManager.setTheme('auto')}
              className="w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <span className="ms-2 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Auto / system
            </span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DarkModeToggle;
