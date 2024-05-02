"use client";
import React, { useEffect, useState } from "react";
import { colors } from "../../../../tailwind.config";
import { usePathname } from "next/navigation";
import SvgIcon from "../icons/CustomIcon";
import { useApiHandler } from "../../../utils/api";

const CustomHeader = () => {
    const [progress, setProgress] = useState<number>();
    const [max, setMax] = useState<number>();
    const apiHandler = useApiHandler();

    const fetchActiveGoal = async () => {
        console.log("Fetching activegoal data");
        try {
            const data = await apiHandler("goal", "get", "/getActiveGoal");
            if (data.status === 200) {
                setProgress(data.data.progress);
                setMax(data.data.amount);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const pathname = usePathname();

    if (
        pathname === "/login" ||
        pathname === "/bankId" ||
        pathname === "/bankId/ChooseAccount"
    ) {
        return;
    }

    fetchActiveGoal();
    // Regular header for all other pages
    return (
        <header>
            <div className="fixed top-0 w-screen h-10 text-center bg-background-50 z-20 drop-shadow-lg">
                <div className="fixed flex align-middle left-5 w-auto text-dark h-auto m-2 px-2 rounded-xl">
                    <SvgIcon
                        className="h-5 w-5"
                        svg={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke={colors.accent}
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                />
                            </svg>
                        }
                    />
                    <h2 className="text-xl text-dark ml-2 align-text-top leading-tight">
                        31
                    </h2>
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
                    <span className="text-xl text-dark ml-2 align-text-top leading-tight">
                        {progress} / {max} kr
                    </span>
                </div>
            </div>
        </header>
    );
};

export default CustomHeader;
