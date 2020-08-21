import React from "react";

const Checkbox = (props) => (
  <div className="checkboxes">
    <label>
      <input
        type="checkbox"
        name={props.label}
        checked={props.isSelected}
        onChange={props.onCheckboxChange}
        className="custom_checkbox"
      />
      {props.label}
    </label>
  </div>
);

export default Checkbox;
