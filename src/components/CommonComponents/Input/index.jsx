import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./Input.module.css";
import { mergeClass } from "@/utils/HelperFunctions"; // Adjust the path as necessary

const Input = ({
  type = "text",
  value,
  setValue,
  label,
  inputContainerClass,
  labelClass,
  inputPropClass,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (setValue) {
      setValue(newValue);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={classes.inputWrapper}>
      {label && (
        <label className={mergeClass(classes.label, labelClass && labelClass)}>
          {label}
        </label>
      )}
      <div
        className={mergeClass(
          classes.inputContainer,
          inputContainerClass && inputContainerClass
        )}
      >
        <input
          type={inputType}
          value={inputValue}
          onChange={handleInputChange}
          {...props}
          className={mergeClass(
            classes.input,
            inputPropClass && inputPropClass
          )}
        />
        {type === "password" && (
          <span
            className={classes.icon}
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
