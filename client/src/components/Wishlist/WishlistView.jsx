import React, { Component } from "react";

import { wishlistApi } from "../../api";

class LinkItem extends Component {
  itemLink = (event) => {
    event.preventDefault();

    window.location.href = `/item/${this.props.item._id}`;
  };

  render() {
    return (
      <div>
        <div>Type: {this.props.item.type}</div>
        <div>Brand: {this.props.item.brand}</div>
        <div>Season: {this.props.item.season}</div>
        <button onClick={this.itemLink}>GO</button>
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
    };
  }

  componentDidMount = async () => {
    const { id } = this.state;
    const wishlist = await wishlistApi.getWishlistById(id);

    this.setState({
      items: wishlist.data.data.items,
    });
  };

  render() {
    const { items } = this.state;

    const listItems = items.map((item) => (
      <LinkItem item={item} key={item._id} />
    ));

    console.log("TCL: ItemsGrid -> render -> items", items);

    return (
      <div>
        <h1>Wishlist</h1>
        <div className="grid grid-cols-1">{listItems}</div>
      </div>
    );
  }
}

export default WishlistView;
