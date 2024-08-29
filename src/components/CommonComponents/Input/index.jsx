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
  handleBlur,
  error = "",
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
          inputContainerClass && inputContainerClass,
          "flex flex-col"
        )}
      >
        <input
          onBlur={handleBlur && hanldeBlur}
          type={inputType}
          value={inputValue}
          onChange={handleInputChange}
          {...props}
          className={mergeClass(
            classes.input,
            inputPropClass && inputPropClass,
            error && "border-red-700"
          )}
        />
        {type === "password" && (
          <span
            className={mergeClass(
              classes.icon,
              "h-max my-auto mx-auto flex flex-col mt-1"
            )}
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
          </span>
        )}
        {error && (
          <div className="flex flex-row text-left w-full mt-1">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
