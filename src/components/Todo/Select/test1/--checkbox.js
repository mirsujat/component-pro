import React from "react";

const Checkbox = (props) => (
  <div className="select_option">
    <label className="custom_checkbox">
      <input
        type="checkbox"
        name={props.label}
        checked={props.isSelected}
        onChange={props.onChange}
        className="select_input"
      />
      <span className="checkmark"></span>
      {props.label}
    </label>
  </div>
);

export default Checkbox;
