import React from "react";

interface CustomIconProps {
  className: string;
  svg: React.ReactNode;  // Accepting React node to allow any JSX element
  ariaLabel?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, svg, ariaLabel }) => {
  return (
    <div className={className} aria-label={ariaLabel}>
      {svg}
    </div>
  );
};

export default CustomIcon;