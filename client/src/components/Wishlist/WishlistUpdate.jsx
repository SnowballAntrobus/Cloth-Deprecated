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
      <div>
        <div>Type: {this.props.item.type}</div>
        <div>Brand: {this.props.item.brand}</div>
        <div>Season: {this.props.item.season}</div>
        <div>
          <button onClick={this.itemLink}>GO</button>
        </div>
        <div>
          <button onClick={this.removeItem}>Remove</button>
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
      <div>
        <h1>My Wishlist</h1>
        <div className="grid grid-cols-1">{listItems}</div>
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
