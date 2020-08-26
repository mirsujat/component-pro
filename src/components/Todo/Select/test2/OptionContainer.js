import React, { Component } from "react";
class OptionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleContainer = React.createRef();
  }
  //Lifecycle methods
  componentDidMount = () => {
    window.addEventListener("click", this.onClickOutSideToHidePopup);
  };

  componentWillUnmount = () => {
    window.removeEventListener("click", this.onClickOutSideToHidePopup);
  };

  //open menu
  onClickinSideToShowPopup = () => {
    this.setState({
      isOpen: true,
    });
  };

  // Close menu
  onClickOutSideToHidePopup = (event) => {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  };

  renderContainer = () => {
    if (this.state.isOpen) {
      return (
        <div
          className="multiselect_container"
          ref={this.toggleContainer}
          onClick={this.onClickinSideToShowPopup}
        >
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
    return;
  };
  render() {
    return this.renderContainer();
  }
}

export default OptionContainer;
