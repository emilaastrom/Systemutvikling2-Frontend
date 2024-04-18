import React from "react";
import { motion } from "framer-motion";
import NavbarButton from "./NavbarButton";
import { Alumni_Sans_Collegiate_One } from "next/font/google";

const Navbar = () => {
  const navbarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="fixed left-0 top-1/2 z-50 hidden md:flex transform -translate-y-1/2 h-auto w-auto flex-col gap-4 bg-white bg-opacity-40 text-black p-5 border-r-2 border-slate-200">
        <NavbarButton to="/home">🏠 Hjem</NavbarButton>
        <NavbarButton to="/about">💭 Om</NavbarButton>
        <NavbarButton to="/savings">💰 Sparing</NavbarButton>
        <NavbarButton to="/share">👤 Konto</NavbarButton>
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
