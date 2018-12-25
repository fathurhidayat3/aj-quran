import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  onCardClick(number) {
    this.props.onCardClick(number);
  }

  render() {
    let props = this.props;

    return (
      <NavHashLink
        smooth
        className={`Card ${
          props.link == window.location.pathname.split("/")[2] &&
          props.hashId == window.location.hash.split("#")[1]
            ? `active`
            : ""
        }`}
        to={`/quran/${props.link}${props.hashId ? `#${props.hashId}` : ""}`}
        // activeStyle={{ className: "active" }}
        activeClassName="active"
        onClick={() => this.onCardClick(props.link)}
      >
        <div className="Card-title">
          {props.title}
          {props.titleHelper ? (
            <span className="Card-title-helper"> ({props.titleHelper})</span>
          ) : null}
          <span className="Card-title-right">{props.titleRight}</span>
        </div>

        <div className="Card-footer">{props.body}</div>
      </NavHashLink>
    );
  }
}

export default Card;
