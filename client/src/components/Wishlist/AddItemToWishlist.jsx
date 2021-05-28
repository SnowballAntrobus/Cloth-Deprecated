import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { wishlistApi } from "../../api";

class AddItemToWishlist extends Component {
  addToWishlist = async (event) => {
    event.preventDefault();
    if (this.props.sessionStore.authUser === null) {
      window.alert("Sign in to use this feature!")
      return
    }
    const id = this.props.sessionStore.authUser.uid;
    await wishlistApi.getWishlistById(id).then((wishlist) => {
      if (
        wishlist.data.data.items.filter(
          (item) => item._id === this.props.item._id
        ).length === 0
      ) {
        const newItems = [...wishlist.data.data.items];
        newItems.push(this.props.item._id);
        const payload = { _id: id, items: newItems };
        wishlistApi.updateWishlistById(this.props.sessionStore.authUser, id, payload).then(() => {
          window.alert("Item added to your wishlist!");
        });
      } else {
        window.alert("Item is already in your wishlist");
      }
    });
  };

  render() {
    return <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={this.addToWishlist}>Add to Wishlist</button>;
  }
}

export default compose(inject('sessionStore'),
  observer
)(AddItemToWishlist);