import React from "react";

const Checkbox = (props) => {
  let className = "select_option";
  if (props.isChecked === true) {
    className += " selected";
  }

  return (
    <div
      className={className}
      role="option"
      aria-selected={props.isChecked}
      aria-posinset={props.index}
    >
      <label className="custom_checkbox" area-label={props.label}>
        <input
          type="checkbox"
          name={props.label}
          checked={props.isChecked}
          aria-checked={props.isChecked}
          onChange={props.onChange}
          value={props.label}
          className="select_input"
        />
        <span className="checkmark"></span>
        {props.label}
      </label>
    </div>
  );
};

export default Checkbox;
