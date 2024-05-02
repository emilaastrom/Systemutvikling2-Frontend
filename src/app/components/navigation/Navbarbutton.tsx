import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarButtonProps {
  to: string;
  children: React.ReactNode;
  ariaLabel?: string; // Optional custom aria-label
}

{
  // Navbar button component, with a 'to' and 'children' prop as well as an optional aria-label prop
}
const NavbarButton = ({ to, children, ariaLabel }: NavbarButtonProps) => {
  /* The aria-label is a prop that increases accessibility when using screen readers.
  If not provided the button defaults the aria-label to "Naviger til {to} siden" - with a default "/" swapped to "hjemmesiden" */
  const finalAriaLabel = ariaLabel
    ? ariaLabel
    : to === "/"
    ? "Naviger til hjemmesiden"
    : `Naviger til ${to.slice(1)} siden`;

  const pathname = usePathname();

  const baseStyles =
    "flex md:flex-row md:min-w-32 flex-col py-2 px-4 md:pl-4 rounded-md md:rounded-lg  shadow-[0_3px_10px_rgb(0,0,0,0.2)]";
  const activeStyles =
    "bg-white border-black text-black dark:bg-slate-900 dark:border-white dark:text-white";
  const inactiveStyles =
    "bg-slate-100 border-slate-300 text-slate-700 dark:bg-opacity-100 dark:bg-slate-500 dark:border-slate-800 dark:text-slate-200";
  const hoverStyles =
    "hover:border-black hover:text-slate-700 hover:scale-110 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 ease-in-out border-2 dark:hover:border-white";

  const className = `${baseStyles} ${
    pathname === to ? activeStyles : inactiveStyles
  } ${hoverStyles}`;

  return (
    <a href={to} className={className} aria-label={finalAriaLabel}>
      <div className="flex flex-col items-center md:flex-row">{children}</div>
    </a>
  );
};

export default NavbarButton;
