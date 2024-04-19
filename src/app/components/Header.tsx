import React from "react";

const Header = () => {
  return (
    <header>
      <div className="fixed w-screen h-20 bg-opacity-15 blur ">
        <div className="fixed w-screen h-20 bg-[#ffffff] bg-opacity-100 blur-xl "></div>
      </div>
      <div className="fixed w-screen h-20 text-center">
        <div className="fixed top-0 left-5 rounded-xl w-auto h-auto m-2 p-2 bg-white text-black bg-opacity-100 ">
          <h2 className="text-xl">🔥 3</h2>
          <div className="text-xs">STREAK</div>
        </div>
        <div className="fixed top-0 right-5 w-auto text-black h-auto m-2 p-2 rounded-xl bg-white bg-opacity-100">
          <span className="text-xl">💸</span>
          <span className="text-xl">300</span>
          <span className="text-xs"> kr</span>
          <h2 className="text-xs">OPPSPART</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
