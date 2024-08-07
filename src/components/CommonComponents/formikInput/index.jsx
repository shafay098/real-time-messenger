import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./formikInput.module.css";
import { mergeClass } from "@/src/utils/HelperFunctions"; // Adjust the path as necessary

const FormikInput = ({
  type = "text",
  value,
  onChange = () => {},
  label,
  inputContainerClass,
  labelClass,
  inputPropClass,
  handleBlur, // Corrected prop name
  error = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(false);
  }, [type]);

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
          name={props.name}
          onBlur={handleBlur}
          type={inputType}
          value={value}
          onChange={onChange}
          {...props}
          className={mergeClass(
            classes.input,
            inputPropClass && inputPropClass,
            error ? classes?.error : classes?.noError
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

export default FormikInput;
