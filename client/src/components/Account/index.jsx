import React from "react";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withAuthorization } from "../Session";

import * as ROUTES from "../../constants/routes";

const AccountPage = ({ sessionStore }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Account</h3>
    </div>
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Username</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{sessionStore.authUser.username}</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{sessionStore.authUser.email}</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <a href={ROUTES.PASSWORD_FORGET} className="font-medium text-indigo-600 hover:text-indigo-500">Change Password</a>
        </div>
      </dl>
    </div>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  inject('sessionStore'),
  observer,
  withAuthorization(condition),
)(AccountPage);
