import React, { Component } from "react";

import { userApi, wishlistApi } from "../../api";

class LinkItem extends Component {
  itemLink = (event) => {
    event.preventDefault();

    window.location.href = `/item/${this.props.item._id}`;
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

class WishlistView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      items: [],
      username: "",
    };
  }

  componentDidMount = async () => {
    const { id } = this.state;
    const wishlist = await wishlistApi.getWishlistById(id);
    const user = await userApi.getUserById(id);

    this.setState({
      items: wishlist.data.data.items,
      username: user.data.data.username,
    });
  };

  render() {
    const { username, items } = this.state;

    const listItems = items.map((item) => (
      <LinkItem item={item} key={item._id} />
    ));

    console.log("TCL: ItemsGrid -> render -> items", items);

    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{username}'s Wishlist</h3>
        </div>
        <div className="border-t border-gray-200">
          {listItems}
        </div>
      </div>
    );
  }
}

export default WishlistView;
