import React from "react";

const TodoAccordSection = (props) => {
  const onClick = () => {
    props.onClick(props.title);
  };
  return (
    <div className="accord_section">
      <div className="accord_section" isopen={props.isopen}>
        <div onClick={onClick} className="title" style={{ cursor: "pointer" }}>
          {props.title}
        </div>
        {props.isopen ? (
          <div className="section_content">{props.children}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TodoAccordSection;
