"use client";
import React from "react";
import { motion } from "framer-motion";
import NavbarButton from "./Navbarbutton";
import { Alumni_Sans_Collegiate_One } from "next/font/google";
import SvgIcon from "../icons/CustomIcon";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const navbarVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };
    const pathname = usePathname();

    if (
        pathname === "/login" ||
        pathname === "/bankId" ||
        pathname === "/bankId/ChooseAccount"
    ) {
        return;
    }

    return (
        <div>
            {/* Desktop Navbar */}

            <div className="fixed left-0 top-1/2 z-30 hidden md:flex transform -translate-y-1/2 h-70 flex-col gap-4 text-black p-5 border-r-2 border-slate-200">
                <div className="flex flex-row">
                    <NavbarButton to="/">
                        <SvgIcon
                            className={"h-5 w-5"}
                            svg={
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
                                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>
                            }
                        />
                        <span className="px-2">Hjem</span>
                    </NavbarButton>
                </div>

                <div className="flex flex-row">
                    <NavbarButton to="/badges">
                        <SvgIcon
                            className={"h-5 w-5"}
                            svg={
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
                                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                    />
                                </svg>
                            }
                        />
                        <span className="px-2">Bragder</span>
                    </NavbarButton>
                </div>

                <div className="flex flex-row">
                    <NavbarButton to="/profile">
                        <SvgIcon
                            className={"h-5 w-5"}
                            svg={
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
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            }
                        />
                        <span className="px-2">Konto</span>
                    </NavbarButton>
                </div>
            </div>

            {/* Mobile Navbar */}

            <motion.div
                className="flex md:hidden m-3 justify-around items-center fixed inset-x-0 bottom-0 bg-opacity-50 pb-2
			bg-slate-200 dark:bg-slate-500 dark:bg-opacity-50 dark:text-white backdrop-blur-5px transform-gpu
			border-black p-3 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]
			z-30 backdrop-all-browsers"
                initial="hidden"
                animate="visible"
                variants={navbarVariants}
            >
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <NavbarButton to="/">
                            <SvgIcon
                                className={"h-5 w-5"}
                                svg={
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
                                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                }
                            />
                            <span className="flex justify-center text-xs pt-1 w-8">
                                HJEM
                            </span>
                        </NavbarButton>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex">
                        <NavbarButton to="/badges">
                            <SvgIcon
                                className={"h-5 w-5"}
                                svg={
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
                                            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                        />
                                    </svg>
                                }
                            />
                            <span className="flex justify-center text-xs pt-1 w-8">
                                BRAGDER
                            </span>
                        </NavbarButton>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex">
                        <NavbarButton to="/profile">
                            <SvgIcon
                                className={"h-5 w-5"}
                                svg={
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
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                }
                            />
                            <span className="flex justify-center text-xs pt-1 w-8">
                                KONTO
                            </span>
                        </NavbarButton>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Navbar;
