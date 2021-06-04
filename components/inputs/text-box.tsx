import React from "react";
import classNames from "classnames";

interface TextBoxProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  onChange: (str: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({
  className,
  type,
  placeholder,
  value,
  error,
  onChange,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={`p-2 w-full bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded outline-none focus:bg-white hover:bg-white cursor-pointer transition duration-400`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default TextBox;
