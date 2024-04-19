"use client";
import React from "react";
import { motion } from "framer-motion";
import { Alumni_Sans_Collegiate_One } from "next/font/google";
import NavbarButton from "./Navbarbutton";
const Navbar = () => {
  const navbarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="fixed left-5 text-2xl rounded-xl w-auto text-left h-auto m-2 p-2 bg-white text-black bg-opacity-100 ">
        <h2 className="text-xl">🔥 3</h2>
        <div className="text-xs">STREAK</div>
      </div>
      <div className="fixed right-5 text-2xl text-center w-auto text-black text-left text-base h-auto m-2 p-2 rounded-xl bg-white bg-opacity-100">
        <span className="text-xl">💸</span>
        <span className="text-xl">300</span>
        <span className="text-xs"> kr</span>
        <h2 className="text-xs">OPPSPART</h2>
      </div>

      <div className="fixed left-0 top-1/2 z-50 hidden md:flex transform -translate-y-1/2 h-auto w-auto flex-col gap-4 bg-white bg-opacity-40 text-black p-5 border-r-2 border-slate-200">
        <NavbarButton to="/">🏠 Hjem</NavbarButton>
        <NavbarButton to="/login">💭 Test Login</NavbarButton>
        <NavbarButton to="/savings">💰 Sparing</NavbarButton>
        <NavbarButton to="/profile">👤 Konto</NavbarButton>
      </div>

      {/* Mobile Navbar */}

      <motion.div
        className="flex md:hidden m-3 justify-around items-center fixed inset-x-0 bottom-0 bg-opacity-80 
			bg-slate-200 backdrop-blur-5px transform-gpu
			border-black p-3 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]
			z-20"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <NavbarButton to="/home">🏠</NavbarButton>
        <NavbarButton to="/about">💭</NavbarButton>
        <NavbarButton to="/savings">💰</NavbarButton>
        <NavbarButton to="/share">👤</NavbarButton>
      </motion.div>
    </div>
  );
};

export default Navbar;
