import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import classes from "./Dropdown.module.css";

const defaultclasses = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    borderRadius: "5px",
    borderColor: "#ccc",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "#e2e6ea"
      : "white",
    color: state.isSelected ? "white" : "black",
    "&:active": {
      backgroundColor: "#007bff",
      color: "white",
    },
  }),
};

const CustomSelect = ({
  options,
  defaultValue,
  onChange,
  placeholder,
  containerClass,
  customclasses,
}) => {
  return (
    <div className={`${classes.container} ${containerClass}`}>
      <Select
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        classes={{ ...defaultclasses, ...customclasses }}
      />
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  containerClass: PropTypes.string,
  customclasses: PropTypes.object,
};

CustomSelect.defaultProps = {
  defaultValue: null,
  placeholder: "Select an option...",
  containerClass: "",
  customclasses: {},
};

export default CustomSelect;
