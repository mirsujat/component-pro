import React, { Component } from "react";

class MultiSelect extends Component {
  static defaultProps = {
    options: [],
    isMultiple: false,
    isObject: true,
    displayValue: "model",
    selectedValues: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedValues: Object.assign([], props.selectedValues),
      selectedOption: null,
      isOpen: false,
    };
    this.toggleContainer = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }

  componentDidUpdate(prevProps) {
    const { options, selectedValues } = this.props;
    const {
      options: prevOptions,
      selectedValues: prevSelectedvalues,
    } = prevProps;
    if (JSON.stringify(prevOptions) !== JSON.stringify(options)) {
      this.setState({
        options,
      });
    }
    if (JSON.stringify(prevSelectedvalues) !== JSON.stringify(selectedValues)) {
      this.setState({
        selectedValues: Object.assign([], selectedValues),
        preSelectedValues: Object.assign([], selectedValues),
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  }

  onClickOutsideHandler(event) {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  }

  selectItemHandler = (id) => {
    const { onSelect } = this.props;
    if (this.isSelectedValue(id)) {
      return;
    }

    onSelect(id);
  };

  isSelectedValue(id) {
    const { selectedValues } = this.state;
    return selectedValues.filter((i) => i.id === id).length > 0;
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  chips() {
    const { selectedValues } = this.state;
    let chip = null;
    if (selectedValues.length > 0) {
      chip = selectedValues.map((item) => {
        const { name, id } = item;
        return (
          <div className="chip" key={id}>
            <span className="chip_text">{name}</span>
            <span className="closebtn">&times;</span>
          </div>
        );
      });
    }
    return chip;
  }

  renderOptions() {
    const { options, selectedValues } = this.state;
    const { isMultiple } = this.props;
    if (isMultiple) {
      return (
        <div className="multiselect_container" ref={this.toggleContainer}>
          {selectedValues.length > 0 ? (
            <div className="chip_content">{this.chips()}</div>
          ) : (
            <div className="empty_text">No option selected</div>
          )}

          <div className="custom_select">
            <div className="select_box" style={{ width: 200 }}>
              <input
                className="select_input"
                type="text"
                placeholder="Select an Option"
                onClick={this.onClickHandler}
              ></input>

              <ul className={this.state.isOpen ? "option_box" : "hidden"}>
                {this.state.isOpen &&
                  options.map((option, i) => (
                    <li
                      key={option.id}
                      className="single_select_option"
                      // onClick={() => this.selectItemHandler(option.id)}
                    >
                      <label className="custom_checkbox">
                        {option.name}
                        <input
                          type="checkbox"
                          name={option.name}
                          onChange={this.onChangeHandler}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="custom_select" ref={this.toggleContainer}>
          <div className="select_box" style={{ width: 200 }}>
            <input
              className="select_input"
              type="text"
              placeholder="Select an Option"
              onClick={this.onClickHandler}
            ></input>
            <ul className="option_box">
              {this.state.isOpen &&
                options.map((option, i) => (
                  <li
                    key={option.id}
                    className="single_select_option"
                    style={{ cursor: "pointer" }}
                  >
                    {option.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log("selectedValues:", this.props.selectedValues);
    return this.renderOptions();
  }
}

export default MultiSelect;

// in app component
// const options = {
//   options: [
//     { id: 1, name: "Apple" },
//     { id: 2, name: "Orange" },
//     { id: 3, name: "Banana" },
//     { id: 4, name: "Pineaple" },
//   ],
// };
// state = {
//   ...options,
//   selectedValues: [],
// };

// getItem = (id) => {
//   const option = this.state.options.find((item) => item.id === id);
//   return option;
// };
// onSelect = (id) => {
//   const tempOptions = [...this.state.options];
//   const { selectedValues } = this.state;
//   const index = tempOptions.indexOf(this.getItem(id));
//   const selectedOption = tempOptions[index];
//   if (selectedValues.length === 0) {
//     this.setState(() => {
//       return { selectedValues: [selectedOption] };
//     });
//   } else {
//     this.setState(() => {
//       return { selectedValues: [...selectedValues, selectedOption] };
//     });
//   }
// };

// onRemove = () => {
//   console.log("click from onRemove");
// };
