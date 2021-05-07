import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "../components/Navigation/NavBar";
import LandingPage from "../components/Landing";
import SignUpPage from "../components/SignUp";
import SignInPage from "../components/SignIn";
import PasswordForgetPage from "../components/PasswordForget";
import HomePage from "../components/Home";
import AccountPage from "../components/Account";
import {
  ItemsList,
  ItemInsert,
  ItemUpdate,
  ItemsGrid,
  ItemPage,
} from "../components/Item";
import { WishlistView, WishlistUpdate } from "../components/Wishlist";

import * as ROUTES from "../constants/routes";
import { withAuthentication } from "../components/Session";

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ITEMS_LIST} exact component={ItemsList} />
      <Route path={ROUTES.ITEMS_GRID} exact component={ItemsGrid} />
      <Route path={ROUTES.ITEM_CREATE} exact component={ItemInsert} />
      <Route path={ROUTES.ITEM_UPDATE} exact component={ItemUpdate} />
      <Route path={ROUTES.ITEM_PAGE} exact component={ItemPage} />
      <Route path={ROUTES.WISHLIST_PAGE} exact component={WishlistView} />
      <Route path={ROUTES.WISHLIST_UPDATE} exact component={WishlistUpdate} />
    </Switch>
  </Router>
);

export default withAuthentication(App);
