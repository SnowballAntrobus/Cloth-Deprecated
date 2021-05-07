import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { withAuthorization } from "../Session";

import { itemApi } from "../../api";

class ItemsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleIncludeItem = async () => {
    const { type, brand, season } = this.state;
    const payload = { type, brand, season };

    await itemApi.insertItem(this.props.sessionStore.authUser, payload).then((res) => {
      window.alert(`Item inserted successfully`);
      this.setState({
        type: "",
        brand: "",
        season: "",
      });
    });
  };

  render() {
    const { type, brand, season } = this.state;
    return (
      <div>
        <h1>Create Item</h1>

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

        <button onClick={this.handleIncludeItem}>Add Item</button>
        <a href={"/items/list"}>Cancel</a>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(inject('sessionStore'),
  observer, withAuthorization(condition)
)(ItemsInsert);
