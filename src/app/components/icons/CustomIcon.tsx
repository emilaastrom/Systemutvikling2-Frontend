// components/CustomIcon.js
import React from "react";

interface CustomIconProps {
  className: string;
  svg: React.ReactNode;  // Accepting React node to allow any JSX element
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, svg }) => {
  // Apply the className to the outer container of the SVG, if necessary
  return (
    <div className={className}>
      {svg}
    </div>
  );
};

export default CustomIcon;
