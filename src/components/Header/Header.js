import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <NavLink
          exact
          to="/quran/1"
          className="nav-item"
          activeStyle={{ className: "active" }}
          isActive={() =>
            window.location.pathname.split("/")[1] === "quran" ||
            window.location.pathname === "/"
          }
        >
          {" "}
          Al Qur'an
        </NavLink>
        {/* <NavLink
          to="/hafalan"
          className="nav-item"
          activeStyle={{ className: "active" }}
        >
          Hafalan
        </NavLink> */}

        <NavLink
          to="/pengaturan"
          className="nav-item right"
          activeStyle={{ className: "active" }}
        >
          Bookmark
        </NavLink>

        {/* <NavLink
          to="/pengaturan"
          className="nav-item right"
          activeStyle={{ className: "active" }}
        >
          Pengaturan
        </NavLink> */}
      </div>
    );
  }
}

export default Header;
