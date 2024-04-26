import React from "react";

interface InputBoxProps {
  label: string;
  placeholder: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  disabled?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  placeholder,
  className = "md:w-1/3 w-2/3",
  classNameLabel = "block text-sm font-medium text-gray-700 dark:text-white",
  classNameInput = "mt-1 border-2 rounded-lg px-4 py-2 border-green-400 dark:bg-slate-200 dark:border-slate-700 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
  disabled = false,
}) => {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  // Conditional class name allowing for opacity and cursor change when disabled
  const dynamicInputClass = `${classNameInput} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <div id={`${inputId}-box`} className={className}>
      <label htmlFor={inputId} className={classNameLabel}>
        {label}:
      </label>
      <input
        type="text"
        id={inputId}
        placeholder={placeholder}
        className={dynamicInputClass}
        style={{ textAlign: "left" }}
        disabled={disabled}
      />
    </div>
  );
};

export default InputBox;
