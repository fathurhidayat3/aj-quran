import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Card from "../Card/Card";
import Searchbox from "../Searchbox/Searchbox";
import Content from "../Content/Content";
import Loader from "../Loader/Loader";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surats: [],
      suratsCopy: [],
      selectedNumber: window.location.pathname.split("/")[2],
      suratsLoaded: false,
      search: false
    };
  }

  async componentWillMount() {
    await this.getSurats();
  }

  getSurats() {
    axios.get(`https://api.alquran.cloud/surah`).then(result => {
      this.setState({
        surats: result.data.data,
        suratsCopy: result.data.data,
        suratsLoaded: true
      });
    });
  }

  onCardClick = number => {
    this.setState({
      selectedNumber: number
    });
  };

  onSearchSubmit = keyword => {
    this.setState({
      suratsLoaded: false
    });

    axios
      .get(`https://api.alquran.cloud/search/${keyword}/all/id.indonesian`)
      .then(result => {
        if (typeof result.data.data != "undefined") {
          this.setState({
            surats: result.data.data.matches,
            suratsLoaded: true,
            search: true
          });
        } else {
          alert("Ma'af hasil tidak ditemukan");

          this.setState({
            surats: this.state.suratsCopy,
            suratsLoaded: true,
            search: false
          });
        }
      });
  };

  resetSearch = () => {
    this.setState({
      surats: this.state.suratsCopy,
      suratsLoaded: true,
      search: false
    });
  };

  render() {
    return (
      <div className="App-wrapper">
        <div className="App-left-sidebar">
          <Searchbox onSearchSubmit={this.onSearchSubmit} />

          <div className="App-surats">
            {!this.state.suratsLoaded ? (
              <Loader loading={true} className="centered" />
            ) : (
              <div>
                {this.state.search && (
                  <div className="App-search-header">
                    <span>
                      Hasil pencarian : <b>{this.state.surats.length}</b>
                    </span>
                    <button onClick={this.resetSearch}>Reset pencarian</button>
                  </div>
                )}
                {this.state.surats.map((surat, index) =>
                  !this.state.search ? (
                    <Card
                      key={index}
                      link={surat.number}
                      title={surat.englishName}
                      titleHelper={surat.revelationType}
                      titleRight={surat.name}
                      body={`${surat.numberOfAyahs} ayat`}
                      onCardClick={this.onCardClick}
                    />
                  ) : (
                    <Card
                      key={index}
                      link={surat.surah.number}
                      hashId={surat.numberInSurah}
                      title={surat.surah.englishName}
                      titleRight={`ayat ke-${surat.numberInSurah}`}
                      body={surat.text}
                      onCardClick={this.onCardClick}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <div className="App-right-sidebar">
          <Content
            number={this.state.selectedNumber}
            location={this.props.location}
          />
        </div>
      </div>
    );
  }
}

export default App;
