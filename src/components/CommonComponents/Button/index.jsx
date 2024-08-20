import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";
import { mergeClass } from "@/utils/HelperFunctions";

export const Button = ({
  children,
  leftIcon,
  rightIcon,
  variant = "primary",
  containerClass,
}) => {
  return (
    <button
      className={mergeClass(classes?.button, containerClass && containerClass)}
      variant={variant}
    >
      {leftIcon && (
        <span className={`${classes.icon} ${classes.iconLeft}`}>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className={`${classes.icon} ${classes.iconRight}`}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

// Button.propTypes = {
//   text: PropTypes.string.isRequired,
//   leftIcon: PropTypes.node,
//   rightIcon: PropTypes.node,
//   variant: PropTypes.oneOf(["primary", "secondary"]),
//   containerClass: PropTypes.string,
// };

// Button.defaultProps = {
//   leftIcon: null,
//   rightIcon: null,
//   variant: "primary",
//   containerClass: "",
// };
