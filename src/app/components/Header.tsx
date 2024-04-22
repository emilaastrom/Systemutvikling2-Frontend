import React from "react";

const CustomHeader = () => {
  return (
    <header>
      <div className="fixed top-0 w-screen h-10 text-center bg-black z-20">
        <div className="fixed left-5 rounded-xl w-auto h-auto m-2 px-2 text-black">
          <h2 className="text-xl text-white">🔥 3</h2>
        </div>
        <div className="fixed right-5 w-auto text-black h-auto m-2 px-2 rounded-xl">
          <span className="text-xl">💸 </span>
          <span className="text-xl text-white">300 / 2000 kr</span>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
