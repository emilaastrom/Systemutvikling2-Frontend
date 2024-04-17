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
      <div className="translate-3d hidden md:flex h-screen w-48 flex-col gap-4 bg-white text-black p-5 border-r-2 border-black">
        <h2 className="text-2xl font-semibold text-center pb-4 pt-4">
          {" "}
          Sparesti
        </h2>
        <a href="#home" className="p-3 border-2 border-black rounded-xl">
          🏠 Hjem
        </a>
        <a href="#about" className="p-3 border-2 border-black rounded-xl">
          {" "}
          💭 Om
        </a>
        <a href="#savings" className="p-3 border-2 border-black rounded-xl">
          💰 Sparing
        </a>
        <a href="#share" className="p-3 border-2 border-black rounded-xl">
          👤 Konto
        </a>
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
