import React from "react";

interface NavbarButtonProps {
  to: string;
  children: React.ReactNode;
  ariaLabel?: string; // Optional custom aria-label
}

{
  /* Navbar button that navigates to a given path.
The aria-label is a prop that increases accessibility when using screen readers.
We check for "/" and replace it with 'Hjemmesiden'. 
If not provided the button defaults the aria-label to "Navigate to {to} page" */
}
const NavbarButton = ({ to, children, ariaLabel }: NavbarButtonProps) => {
  const finalAriaLabel = ariaLabel
    ? ariaLabel
    : to === "/"
    ? "Naviger til hjemmesiden"
    : `Naviger til ${to.slice(1)} siden`;

  return (
    <a
      href={to}
      className="flex md:flex-row md:min-w-32 flex-col py-2 px-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        bg-white bg-opacity-99 border-solid border-gray-200 
        hover:border-slate-400 hover:text-black hover:scale-110
        transition-all duration-300 ease-in-out border-2
        dark:bg-slate-800 dark:border-slate-300 dark:text-white dark:hover:border-mantis-300
        "
      aria-label={finalAriaLabel}
    >
      <div className="flex flex-col items-center md:flex-row">{children}</div>
    </a>
  );
};

export default NavbarButton;
