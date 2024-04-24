import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarButtonProps {
  to: string;
  children: React.ReactNode;
  ariaLabel?: string; // Optional custom aria-label
}

{
// Navarbutton component, with a to prop, children prop and an optional aria-label prop
}
const NavbarButton = ({ to, children, ariaLabel }: NavbarButtonProps) => {

    /* The aria-label is a prop that increases accessibility when using screen readers.
  We are checking for "/" and replacing it with 'Hjemmesiden'. 
  If not provided the button defaults the aria-label to "Naviger til {to} siden" */
  const finalAriaLabel = ariaLabel
    ? ariaLabel
    : to === "/"
    ? "Naviger til hjemmesiden"
    : `Naviger til ${to.slice(1)} siden`;

  const pathname = usePathname(); // Declare the correct type for the pathname object

  const baseStyles = "flex md:flex-row md:min-w-32 flex-col py-2 px-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]";
  const activeStyles = "bg-white border-black text-black dark:bg";
  const inactiveStyles = "bg-slate-100 border-slate-300 text-slate-700";
  const hoverStyles = "hover:border-black hover:text-slate-700 hover:scale-110 hover:bg-white transition-all duration-300 ease-in-out border-2";
  const darkStyles = "dark:bg-slate-800 dark:selection:bg-border-red-500 dark:border-slate-300 dark:text-white dark:hover:border-white";

  const className = `${baseStyles} ${
    pathname === to ? activeStyles : inactiveStyles
  } ${hoverStyles} ${darkStyles}`;

  return (
    <a
      href={to}
      className={ className }
      aria-label={finalAriaLabel}
    >
      <div className="flex flex-col items-center md:flex-row">{children}</div>
    </a>
  );
};

export default NavbarButton;
