import React, { Component } from "react";
import TodoAccordSection from "./TodoAccordSection";

class TodoAccord extends Component {
  static defaultProps = { allowMultipleOpen: false };
  constructor(props) {
    super(props);
    const openSections = {};
    this.props.children.forEach((child) => {
      if (child.props.isopen) {
        openSections[child.props.title] = true;
      }
    });
    this.state = { openSections };
  }
  onClick = (title) => {
    const { openSections } = this.state;
    const isopen = openSections[title];
    if (this.props.allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [title]: !isopen,
        },
      });
    } else {
      this.setState({
        openSections: { [title]: !isopen },
      });
    }
  };
  render() {
    const { children } = this.props;
    const { openSections } = this.state;
    return (
      <div className="accord">
        {children.map((child, i) => {
          return (
            <TodoAccordSection
              title={child.props.title}
              onClick={this.onClick}
              isopen={openSections[child.props.title]}
              key={i}
            >
              {child.props.children}
            </TodoAccordSection>
          );
        })}
      </div>
    );
  }
}

export default TodoAccord;
