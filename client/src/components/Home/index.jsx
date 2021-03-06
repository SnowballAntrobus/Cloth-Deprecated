import React from "react";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withAuthorization } from "../Session";

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  inject('sessionStore'),
  observer,
  withAuthorization(condition),
)(HomePage);
