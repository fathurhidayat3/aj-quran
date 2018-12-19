import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  onCardClick(number) {
    this.props.onCardClick(number);
  }

  render() {
    let { surat } = this.props;

    return (
      <NavLink
        className="Card"
        to={`/quran/${surat.number}`}
        activeStyle={{ className: "active" }}
        onClick={() => this.onCardClick(surat.number)}
      >
        <div className="Card-title">
          {surat.englishName}
          <span className="Card-title-helper"> ({surat.revelationType})</span>
          <span className="Card-title-right">{surat.name}</span>
        </div>

        <div className="Card-footer">{surat.numberOfAyahs} ayat</div>
      </NavLink>
    );
  }
}

export default Card;
