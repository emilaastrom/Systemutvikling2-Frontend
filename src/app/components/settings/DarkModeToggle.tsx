import React, { useEffect, useState } from "react";
import ThemeManager from "./ThemeManager";
import { useApiHandler } from "../../../utils/api";

const DarkModeToggle = () => {
    const [theme, setTheme] = useState("light"); // Default to 'light' if no theme is fetched
    const apiHandler = useApiHandler(); // Get the apiHandler from the custom hook

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const userData = await apiHandler("user", "get", "/getUser");
                const fetchedThemeData = userData.data.theme;
                const lowerCaseTheme = fetchedThemeData.toLowerCase();
                if (fetchedThemeData) {
                    setTheme(lowerCaseTheme);
                    ThemeManager.setTheme(lowerCaseTheme);
                }
            } catch (error) {
                console.error("Failed to fetch user theme:", error);
            }
        };

        fetchTheme();
    }, [apiHandler]); // apiHandler added as a dependency

    const handleThemeChange = (newTheme) => {
        const upperCaseTheme = newTheme.toUpperCase();
        setTheme(newTheme);
        ThemeManager.setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Update localStorage
        try {
            apiHandler("user", "put", "/updateUser", { theme: upperCaseTheme }); // Update the user's theme in the database
        } catch (error) {
            console.error("Failed to update user theme:", error);
        }
    };

    return (
        <div
            className="flex justify-center items-center"
            data-testid="darkmodetoggle"
        >
            <ul className="items-center w-2/3 md:w-auto text-sm font-medium border-green-400 text-gray-900 bg-white border rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 overflow-hidden ">
                    <label className="flex items-center ps-3 w-full cursor-pointer">
                        <input
                            id="horizontal-list-radio-license"
                            type="radio"
                            value="light"
                            name="list-radio"
                            checked={theme === "light"}
                            onChange={() => handleThemeChange("light")}
                            className="w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <span className="ms-2 py-3 text-sm font-medium text-gray-900 dark:text-white">
                            Lys modus
                        </span>
                    </label>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 dark:text-white">
                    <label className="flex items-center ps-3 w-full cursor-pointer">
                        <input
                            id="horizontal-list-radio-id"
                            type="radio"
                            value="dark"
                            name="list-radio"
                            checked={theme === "dark"}
                            onChange={() => handleThemeChange("dark")}
                            className="w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <span className="ms-2 py-3 text-sm font-medium text-gray-900 dark:text-white">
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
                            checked={theme === "auto"}
                            onChange={() => handleThemeChange("auto")}
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
