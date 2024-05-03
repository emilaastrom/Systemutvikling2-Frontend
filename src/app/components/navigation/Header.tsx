"use client";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../tailwind.config";
import SvgIcon from "../icons/CustomIcon";
import { useApiHandler } from "../../../utils/api";
import { get } from "http";

const CustomHeader = () => {
    const [progress, setProgress] = useState<number>();
    const [max, setMax] = useState<number>();

    const [currentTheme, setCurrentTheme] = useState<string>();
    const apiHandler = useApiHandler();
    const [goalData, setGoalData] = useState<any>();
    const [themeData, setThemeData] = useState<any>();
    let theme: string | null;
    if (!themeData) {
        theme = localStorage.getItem("theme") || null;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (
                theme === null ||
                theme === ""
            ) {
                apiHandler("user", "get", "/getUser")
                    .then((res) => {
                        localStorage.setItem("theme", res.data.theme);
                    })
                    .catch((error) => {
                        console.error("Fetching data failed:", error);
                    });
            }

            if (
                !goalData ||
                themeData === "" ||
                themeData === null ||
                themeData === undefined
            ) {
                try {
                    const [goalData, themeData] = await Promise.all([
                        apiHandler("goal", "get", "/getActiveGoal"),
                        apiHandler("user", "get", "/getUser"),
                    ]);
                    setGoalData(goalData);
                    setThemeData(themeData);
                    setCurrentTheme(themeData.data);

                    if (goalData.status === 200) {
                        setProgress(goalData.data.progress);
                        setMax(goalData.data.amount);
                    }

                    if (themeData.status === 200) {
                        setCurrentTheme(themeData.data.theme);
                        localStorage.setItem("theme", themeData.data.theme);
                    }
                } catch (error) {
                    console.error("Fetching data failed:", error);
                }
            }
        };

        fetchData();
    }, [apiHandler, currentTheme, goalData, themeData]);

    useEffect(() => {
        const handleThemeChange = (newTheme) => {
            document.body.classList.toggle("dark", newTheme === "dark");
        };

        const theme = localStorage.getItem("theme");
        setCurrentTheme(theme);
        handleThemeChange(theme);
    }, []);

    const setThemeAPI = async (theme: string) => {
        const themeData = { theme: theme.toUpperCase() };
        try {
            await apiHandler("user", "put", "/updateUser", themeData);
            setCurrentTheme(theme);
            localStorage.setItem("theme", theme);
            document.body.classList.toggle("dark", theme === "dark");
        } catch (error) {
            console.error("Setting theme failed:", error);
        }
    };

    const handleThemeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        let newTheme = "";
        if (localStorage.getItem("theme") !== "") {
            newTheme = currentTheme === "light" ? "dark" : "light";
        } else {
            newTheme = "dark";
        }
        localStorage.setItem("theme", newTheme);
        setThemeAPI(newTheme);
    };


    return (
        <header>
            <div className="fixed top-0 w-screen h-10 text-center bg-background-50 dark:bg-slate-600 dark:text-white z-20 drop-shadow-lg">
                <div className="fixed flex align-middle left-5 w-auto  h-auto m-2 px-2 rounded-xl">
                    <button
                        onClick={handleThemeChange}
                        className="transition-opacity duration-500"
                    >
                        <SvgIcon
                            className="h-5 w-5"
                            svg={
                                currentTheme === "dark" ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                        />
                                    </svg>
                                )
                            }
                        />
                    </button>
                </div>
                <div className="fixed flex right-5 w-auto h-fill align-middle text-black h-auto m-2 px-2 rounded-xl">
                    <SvgIcon
                        className={"h-5 w-5 flex origin-top"}
                        svg={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={colors.primary.dark}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke={colors.primary.light}
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                />
                            </svg>
                        }
                    />
                    <span className="text-xl text-dark dark:text-white  ml-2 align-text-top leading-tight">
                        {Math.floor(progress ?? 0)} / {max ?? 0} kr
                    </span>
                </div>
            </div>
        </header>
    );
};

export default CustomHeader;
