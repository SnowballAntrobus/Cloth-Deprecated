import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { withAuthorization } from "../Session";

import { itemApi } from "../../api";

import * as ROUTES from "../../constants/routes";

class ItemsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      type: "",
      brand: "",
      season: "",
    };
  }

  handleChangeInputType = async (event) => {
    const type = event.target.value;
    this.setState({ type });
  };

  handleChangeInputBrand = async (event) => {
    const brand = event.target.value;
    this.setState({ brand });
  };

  handleChangeInputSeason = async (event) => {
    const season = event.target.value;
    this.setState({ season });
  };

  handleUpdateItem = async () => {
    const { id, type, brand, season } = this.state;
    const payload = { type, brand, season };

    await itemApi.updateItemById(this.props.sessionStore.authUser, id, payload).then((res) => {
      window.alert(`Item updated successfully`);
      this.setState({
        type: "",
        brand: "",
        season: "",
      });
    });
    this.props.history.push(ROUTES.ITEMS_LIST);
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const item = await itemApi.getItemById(id);

    this.setState({
      type: item.data.data.type,
      brand: item.data.data.brand,
      season: item.data.data.season,
    });
  };

  render() {
    const { type, brand, season } = this.state;
    return (
      <div>
        <h1>Update Item</h1>

        <label>Type: </label>
        <input type="text" value={type} onChange={this.handleChangeInputType} />

        <label>Brand: </label>
        <input
          type="text"
          value={brand}
          onChange={this.handleChangeInputBrand}
        />

        <label>Season: </label>
        <input
          type="text"
          value={season}
          onChange={this.handleChangeInputSeason}
        />

        <button onClick={this.handleUpdateItem}>Update Item</button>
        <a href={ROUTES.ITEMS_LIST}>Cancel</a>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(inject('sessionStore'),
  observer,
  withRouter,
  withAuthorization(condition)
)(ItemsUpdate);
