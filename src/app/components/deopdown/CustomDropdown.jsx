import React, { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";

const CustomDropdown = ({ options, options1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options ? options[0] : options1[0]
  );

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    // Update the selected option when the options prop changes
    setSelectedOption(options ? options[0] : options1[0]);
  }, [options, options1]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={handleToggleDropdown}
          className="flex items-center cursor-pointer py-2 px-4 border-0 outline-none bg-transparent text-base rounded-md"
        >
          <span className="mr-2">{selectedOption || "Select an option"}</span>
          <SlArrowDown />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options
              ? options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                      selectedOption === option ? "bg-gray-100" : ""
                    }`}
                  >
                    {option}
                  </div>
                ))
              : options1.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                      selectedOption === option ? "bg-gray-100" : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
