import React, { Component } from "react";
import axios from "axios";

import "./Player.css";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qoris: [],
      selectedAyat: window.location.hash.split("#")[1]
        ? window.location.hash.split("#")[1]
        : 1
    };
  }

  async componentWillMount() {
    await this.getQori();
  }

  componentWillReceiveProps() {
    this.setState({
      selectedAyat: window.location.hash.split("#")[1]
        ? window.location.hash.split("#")[1]
        : 1
    });
  }

  async getQori() {
    await axios
      .get(`https://api.alquran.cloud/edition?language=ar`)
      .then(result => {
        this.setState({
          selectedAyat: window.location.hash.split("#")[1]
            ? window.location.hash.split("#")[1]
            : 1,
          qoris: result.data.data
        });
      });
  }

  onAyatChange = e => {
    document.getElementById(e.target.value).scrollIntoView({
      behavior: "smooth"
    });

    window.history.pushState(null, null, `#${e.target.value}`);

    this.setState({
      selectedAyat: e.target.value
    });
  };

  onQoriChange(e) {
    this.props.onQoriChange(e.target.value);
  }

  render() {
    return (
      <div className="Player">
        {/* <button className="Input-circle-button">
          <i className="fa fa-play" />
        </button> */}

        <div className="Input-form-group fit-content">
          <label>Ke ayat : </label>
          <select
            name=""
            id=""
            value={this.state.selectedAyat}
            onChange={e => this.onAyatChange(e)}
          >
            {this.props.selectedSuratAr.map((ayat, index) => (
              <option value={ayat.numberInSurah} key={index}>
                {ayat.numberInSurah}
              </option>
            ))}
          </select>
        </div>

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
