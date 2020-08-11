import React from "react";

const TodoAccordSection = (props) => {
  return (
    <div className="accord_section">
      <div className="title">
        {props.title}
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default TodoAccordSection;
