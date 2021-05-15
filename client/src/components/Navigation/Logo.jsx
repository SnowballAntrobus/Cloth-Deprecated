import React, { Component } from "react";

import logo from "../logo.svg";

import * as ROUTES from "../../constants/routes";

class Logo extends Component {
  render() {
    return (
      <a href={ROUTES.HOME}>
        <img src={logo} width="50" height="50" alt="cloth-logo" />
      </a>
    );
  }
}

export default Logo;
