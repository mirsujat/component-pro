import React from "react";

const Checkbox = (props) => (
  <li className="single_select_option">
    <label className="custom_checkbox">
      <input
        type="checkbox"
        name={props.label}
        checked={props.isSelected}
        onChange={props.onCheckboxChange}
        className="select_input"
      />
      <span className="checkmark"></span>
      {props.label}
    </label>
  </li>
);

export default Checkbox;
