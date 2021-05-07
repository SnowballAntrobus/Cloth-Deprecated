import React from "react";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withAuthorization } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const AccountPage = ({ sessionStore }) => (
  <div>
    <h1>Account: {sessionStore.authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  inject('sessionStore'),
  observer,
  withAuthorization(condition),
)(AccountPage);
