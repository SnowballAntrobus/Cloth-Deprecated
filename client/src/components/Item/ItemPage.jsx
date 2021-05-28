import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { itemApi } from "../../api";

import { AddItemToWishlist } from "../Wishlist/AddItemToWishlist"

class ItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,

      description: "",
      imageURL: "",
      type: "",
      brand: [],
      season: "",

      sellers: [],
      w2c: [],
    };
  }

  componentDidMount = async () => {
    const { id } = this.state;
    const item = await itemApi.getItemById(id);

    this.setState({
      description: item.data.data.description,
      imageURL: item.data.data.imageURL,
      type: item.data.data.type,
      brand: item.data.data.brand,
      season: item.data.data.season,
      sellers: item.data.data.sellers,
      w2c: item.data.data.w2c,
    });
  };

  render() {
    const { id, description, imageURL, type, brand, season, sellers, w2c } = this.state;
    const item = { _id: id, description: description, imageURL: imageURL, type: type, brand: brand, season: season, sellers: sellers, w2c: w2c };

    return (
      <div className="m-10 flex justify-center">
        <div className="">
          <div className="w-80 rounded shadow-lg">
            <img src={imageURL} alt="product" />
          </div>
          <div className="p-6">
            <div className="flex-wrap">
              <h1 className="flex-auto text-xl font-semibold">
                {description}
              </h1>
              <div className="text-xl font-semibold text-gray-500">
                <AddItemToWishlist item={item} authUser={this.props.sessionStore.authUser} />
              </div>
              <div className="w-full text-sm font-medium text-gray-500 mt-2">
                Brand: {brand}
              </div>
              <div className="w-full text-sm font-medium text-gray-500 mt-2">
                Type: {type}
              </div>
              <div className="w-full text-sm font-medium text-gray-500 mt-2">
                Season: {season}
              </div>
              <div className="w-full text-sm font-medium text-gray-500 mt-2">
                Sellers: {sellers}
              </div>
              <div className="w-full text-sm font-medium text-gray-500 mt-2">
                W2C: {w2c}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(inject('sessionStore'),
  observer
)(ItemPage);
