import React from "react";

interface NavbarButtonProps {
  to: string;
  children: React.ReactNode;
}

const NavbarButton = ({ to, children }: NavbarButtonProps) => {
  return (
    <a
        href={to}
        className="text-center py-2 px-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        bg-white bg-opacity-99 border-solid border-gray-200 
        hover:border-mantis-300 hover:text-black hover:scale-105 hover:bg-color-mantis-100
        transition-all duration-300 ease-in-out border-2"
    >
        <span>{children}</span>
    </a>
  );
};

export default NavbarButton;
