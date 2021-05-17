import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withAuthorization } from "../Session";

import { userApi } from "../../api";

import * as ROUTES from "../../constants/routes";

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: ""
    };
  }

  componentDidMount = async () => {
    const email = this.props.sessionStore.authUser.email;
    const id = this.props.sessionStore.authUser.uid;
    const user = await userApi.getUserById(id);
    const username = user.data.data.username;
    console.log(username)

    this.setState({
      username: username,
      email: email,
    });
  };

  render() {
    const { username, email } = this.state;
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Account</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ username }</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ email }</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <a href={ROUTES.PASSWORD_FORGET} className="font-medium text-indigo-600 hover:text-indigo-500">Change Password</a>
            </div>
          </dl>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  inject('sessionStore'),
  observer,
  withAuthorization(condition),
)(AccountPage);
