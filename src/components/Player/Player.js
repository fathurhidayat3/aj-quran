import React, { Component } from "react";
import axios from "axios";

import "./Player.css";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qoris: []
    };
  }

  async componentWillMount() {
    await this.getQori();
  }

  async getQori() {
    await axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}http://api.alquran.cloud/edition?language=ar`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(result => {
        this.setState({
          qoris: result.data.data
        });
      });
  }

  onQoriChange(e) {
    this.props.onQoriChange(e.target.value);
  }

  render() {
    return (
      <div className="Player">
        {/* <button className="Input-circle-button">
          <i className="fa fa-play" />
        </button> */}

        <div className="Input-form-group right">
          <label>Qori' : </label>
          <select
            name=""
            id=""
            value={this.props.defaultQori}
            onChange={e => this.onQoriChange(e)}
          >
            {this.state.qoris.map(qori => (
              <option value={qori.identifier} key={qori.identifier}>
                {qori.englishName}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Player;
