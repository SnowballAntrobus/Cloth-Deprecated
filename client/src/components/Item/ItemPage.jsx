import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { itemApi, wishlistApi } from "../../api";

class AddItemToWishlist extends Component {
  addToWishlist = (event) => {
    event.preventDefault();
    if (this.props.authUser === null) {
      window.alert("Sign in to use this feature!")
      return
    }
    const id = this.props.authUser.uid;
    wishlistApi.getWishlistById(id).then((wishlist) => {
      if (
        wishlist.data.data.items.filter(
          (item) => item._id === this.props.item._id
        ).length === 0
      ) {
        const newItems = [...wishlist.data.data.items];
        newItems.push(this.props.item);
        const payload = { items: newItems };
        wishlistApi.updateWishlistById(this.props.authUser, id, payload).then(() => {
          window.alert("Item added to your wishlist!");
        });
      } else {
        window.alert("Item is already in your wishlist");
      }
    });
  };

  render() {
    return <button onClick={this.addToWishlist}>Add to Wishlist</button>;
  }
}

class ItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageURL: "",
      type: "",
      brand: "",
      season: "",
      w2c: [],
    };
  }

  componentDidMount = async () => {
    const { id } = this.state;
    const item = await itemApi.getItemById(id);

    this.setState({
      imageURL: item.data.data.imageURL,
      type: item.data.data.type,
      brand: item.data.data.brand,
      season: item.data.data.season,
      w2c: item.data.data.w2c,
    });
  };

  render() {
    const { id, imageURL, type, brand, season, w2c } = this.state;
    const item = { _id: id, imageURL: imageURL, type: type, brand: brand, season: season, w2c: w2c };
    return (
      <div>
        <h1>Item Page</h1>
        <AddItemToWishlist item={item} authUser={this.props.sessionStore.authUser} />
        <div>
          <ul>
            <li><img src={imageURL} alt="product" /></li>
            <li>Type: {type}</li>
            <li>Brand: {brand}</li>
            <li>Season: {season}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default compose(inject('sessionStore'),
  observer
)(ItemPage);
