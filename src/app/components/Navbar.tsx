import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const navbarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden md:flex h-screen w-48 flex-col gap-4 bg-white text-black p-5 border-r-2 border-black">
        <h2 className="text-2xl font-semibold text-center pb-4 pt-4">
          Sparesti
        </h2>
        <a href="#home" className="p-3 border-2 border-black rounded-xl">
          🏠 Home
        </a>
        <a href="#about" className="p-3 border-2 border-black rounded-xl">
          💭 About
        </a>
        <a href="#savings" className="p-3 border-2 border-black rounded-xl">
          💰 Savings
        </a>
        <a href="#share" className="p-3 border-2 border-black rounded-xl">
          📨 Share
        </a>
      </div>

      {/* Mobile Navbar */}
      <motion.div
        className="flex md:hidden m-5 justify-around items-center fixed inset-x-0 bottom-0 bg-green-200   border-black p-4 rounded-3xl"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        transition={{ duration: 0.5 }}
      >
        <a href="#home" className="text-black text-xl">
          🏠
        </a>
        <a href="#about" className="text-black text-xl">
          💭
        </a>
        <a href="#savings" className="text-black text-xl">
          💰
        </a>
        <a href="#share" className="text-black text-xl">
          📨
        </a>
      </motion.div>
    </div>
  );
};

export default Navbar;
