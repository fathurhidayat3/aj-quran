import React, { Component } from "react";

import "./Searchbox.css";

class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  render() {
    return (
      <div className="Searchbox">
        <input
          type="text"
          name=""
          id=""
          value={this.state.keyword}
          placeholder="Masukkan kata kunci"
          onChange={this.handleOnChange}
          onKeyPress={e =>
            e.key === "Enter"
              ? this.props.onSearchSubmit(this.state.keyword)
              : null
          }
        />
        <button onClick={() => this.props.onSearchSubmit(this.state.keyword)}>
          Cari ayat
        </button>
      </div>
    );
  }
}

export default Searchbox;
