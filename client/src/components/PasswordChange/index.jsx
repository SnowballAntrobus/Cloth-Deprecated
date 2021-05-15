import React, { Component } from "react";
import { withFirebase } from "../Firebase";

import logo from "../logo.svg";

const INITIAL_STATE = {
  password: "",
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { password } = this.state;

    this.props.firebase
      .doPasswordUpdate(password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password, error } = this.state;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img src={logo} className="mx-auto h-12 w-auto" alt="cloth-logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"> Reset Password </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={this.onSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change My Password
              </button>
            </div>
          </form>
          {error && <p>{error.message}</p>}
        </div>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
