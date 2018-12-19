import React, { Component } from "react";

import { SyncLoader } from "react-spinners";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading
    };
  }

  render() {
    return (
      <div className="sweet-loading" style={{ height: this.props.height }}>
        <SyncLoader
          className={this.props.className}
          sizeUnit={"px"}
          size={12}
          margin={"10px"}
          color={"#7f8fa6"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loader;
