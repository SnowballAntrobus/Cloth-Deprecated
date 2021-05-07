import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

class SignOutButton extends Component {
  onClick = (event) => {
    this.props.firebase.doSignOut();
    this.props.history.push(ROUTES.LANDING);
  };

  render() {
    return (
      <button type="button" onClick={this.onClick}>
        Sign Out
      </button>
    );
  }
}

export default compose(withRouter, withFirebase)(SignOutButton);
