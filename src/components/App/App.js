import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

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
      selectedNumber: 1,
      suratsLoaded: false
    };
  }

  async componentWillMount() {
    await this.getSurats();
  }

  getSurats() {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}http://api.alquran.cloud/surah`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(result => {
        this.setState({
          surats: result.data.data,
          suratsLoaded: true
        });
      });
  }

  onCardClick = number => {
    this.setState({
      selectedNumber: number
    });
  };

  render() {
    return (
      <div className="App-wrapper">
        <div className="App-left-sidebar">
          <div className="App-surats">
            {!this.state.suratsLoaded ? (
              <Loader loading={true} className="centered" />
            ) : (
              this.state.surats.map(surat => (
                <Card
                  key={surat.number}
                  surat={surat}
                  onCardClick={this.onCardClick}
                />
              ))
            )}
          </div>

          {/* <Searchbox /> */}
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
