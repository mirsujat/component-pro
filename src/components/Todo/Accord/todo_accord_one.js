import React, { Component } from "react";

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
      this.setState({ openSections: { ...openSections, [title]: !isopen } });
    } else {
      this.setState({ openSections: { [title]: !isopen } });
    }
  };

  render() {
    return (
      <div className="accord_container">
        {this.props.children.map((child) => {
          return (
            <div
              className="accord_section"
              key={child.props.title}
              isopen={this.state.openSections[child.props.title]}
            >
              <div
                className="accord_title"
                onClick={() => this.onClick(child.props.title)}
              >
                {child.props.title}
              </div>
              {this.state.openSections[child.props.title] ? (
                <div className="content">{child.props.children}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default TodoAccord;
