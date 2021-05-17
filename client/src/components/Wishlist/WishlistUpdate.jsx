import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { withAuthorization } from "../Session";

import { wishlistApi } from "../../api";

class LinkItem extends Component {
  itemLink = (event) => {
    event.preventDefault();

    window.location.href = `/item/${this.props.item._id}`;
  };
  removeItem = async () => {
    await this.props.removeItem(this.props.item);
    window.location.reload();
  };

  render() {
    return (
      <div className="m-10 flex">
        <div className="w-40 h-40 overflow-hidden rounded shadow-lg">
          <img src={this.props.item.imageURL} alt="product" />
        </div>
        <div className="flex-wrap p-5">
          <h1 className="flex-auto text-xl font-semibold">
            Short Description
          </h1>
          <div className="w-full text-sm font-medium text-gray-500 mt-2">
            Brand: {this.props.item.brand}
          </div>
          <div>
            <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={this.itemLink}>GO</button>
          </div>
          <div>
            <button className="font-medium text-red-600 hover:text-red-500" onClick={this.removeItem}>Remove</button>
          </div>
        </div>
      </div>
    );
  }
}

class WishlistUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      items: [],
    };
  }

  componentDidMount = async () => {
    const { id } = this.state;
    const wishlist = await wishlistApi.getWishlistById(id);

    this.setState({
      items: wishlist.data.data.items,
    });
  };

  removeItem = async (item_to_remove) => {
    console.log(item_to_remove);
    const { id, items } = this.state;
    const result = items.filter((item) => item._id !== item_to_remove._id);
    const payload = { items: result };

    await wishlistApi
      .updateWishlistById(this.props.sessionStore.authUser, id, payload)
      .then((res) => {
        window.alert(`Item removed successfully`);
      });
  };

  render() {
    const { items } = this.state;

    const listItems = items.map((item) => (
      <LinkItem item={item} key={item._id} removeItem={this.removeItem} />
    ));

    console.log("TCL: ItemsGrid -> render -> items", items);

    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">My Wishlist</h3>
        </div>
        <div className="border-t border-gray-200">
          {listItems}
        </div>
      </div>
    );
  }
}

const condition = (authUser) => {
  if (!!authUser) {
    return authUser.uid === window.location.pathname.split("/")[2];
  }
};

export default compose(inject('sessionStore'),
  observer,
  withAuthorization(condition)
)(WishlistUpdate);
