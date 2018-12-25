import React, { Component } from "react";
import axios from "axios";

import "./Content.css";

import Player from "../Player/Player";

import Loader from "../Loader/Loader";

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSuratId: {
        ayahs: []
      },
      selectedSuratAr: {
        ayahs: []
      },
      selectedUrl: "",
      selectedSuratLoaded: false,
      selectedSurat: this.props.location.pathname.split("/")[2],
      arQori: "ar.alafasy",
      play: false
    };

    this.audio = new Audio();

    this.onQoriChange = this.onQoriChange.bind(this);
  }

  async componentWillMount() {
    await this.getSurat();
  }

  async componentDidUpdate(nextProps) {
    if (
      JSON.stringify(this.props.location.pathname) !==
      JSON.stringify(nextProps.location.pathname)
    ) {
      this.setState({
        selectedSuratLoaded: false,
        selectedSurat: this.props.location.pathname.split("/")[2]
      });

      await this.getSurat();
    }
  }

  async getSurat() {
    let editionId = "id.indonesian";
    let editionAr = await this.state.arQori;
    // let editionsAr = ["ar.alafasy", "ar.hanirifai", "ar.abdurrahmaansudais"];

    await axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}http://api.alquran.cloud/surah/${
          this.state.selectedSurat
        }/editions/${editionId},${editionAr}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(result => {
        this.setState({
          selectedSuratId: result.data.data[0],
          selectedSuratAr: result.data.data[1],
          selectedSuratLoaded: true
        });
      });
  }

  async togglePlay(url) {
    this.audio.src = await url;

    this.setState({ play: !this.state.play });

    this.audio.addEventListener("ended", () => {
      this.setState({ play: false });
    });

    this.state.play ? this.audio.play() : this.audio.pause();
  }

  async onQoriChange(identifier) {
    await this.setState({
      arQori: identifier,
      selectedSuratLoaded: false
    });

    await this.getSurat();
  }

  render() {
    return (
      <div className="Content">
        <div className="Content-detail">
          {!this.state.selectedSuratLoaded ? (
            <Loader loading={true} className="centered" />
          ) : (
            <div>
              <div className="Content-header">
                {this.state.selectedSuratId.englishName}
              </div>
              <div className="Content-body">
                <ul className="ListBorder">
                  {this.state.selectedSuratAr.ayahs.map((ayat, index) => (
                    <li
                      className="ListItem"
                      key={ayat.number}
                      id={ayat.numberInSurah}
                    >
                      <div className="Listitem-floating">
                        <span className="Listitem-number">
                          {ayat.numberInSurah}
                        </span>
                        <span
                          className="Listitem-play"
                          onClick={() => this.togglePlay(ayat.audio)}
                        >
                          {this.state.play ? "jeda" : "dengarkan"}
                        </span>
                      </div>
                      <div className="ListItem-body">{ayat.text}</div>
                      <div className="ListItem-footer">
                        {this.state.selectedSuratId.ayahs[index].text}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <Player
          location={this.props.location}
          onQoriChange={this.onQoriChange}
          defaultQori={this.state.arQori}
          selectedSuratAr={this.state.selectedSuratAr.ayahs}
        />
      </div>
    );
  }
}

export default Content;
