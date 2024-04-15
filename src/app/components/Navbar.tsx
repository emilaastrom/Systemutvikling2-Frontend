import React from "react";

const Navbar = () => {
  return (
    <div className="h-screen w-48 flex flex-col gap-4 bg-white  text-white p-5 border-r-2 border-black">
      <h2 className="text-2xl font-semibold text-center pb-4 pt-4 text-black">
        Sparesti
      </h2>
      <a
        href="#home"
        className="p-3   border-2 border-black rounded-xl text-black"
      >
        🏠 Home
      </a>
      <a
        href="#about"
        className="p-3   border-2 border-black rounded-xl text-black"
      >
        💭 About
      </a>
      <a
        href="#savings"
        className="p-3  border-2 border-black rounded-xl text-black"
      >
        💰 Savings
      </a>
      <a
        href="#share"
        className="p-3   border-2 border-black rounded-xl text-black"
      >
        📨 Share
      </a>
    </div>
  );
};

export default Navbar;
