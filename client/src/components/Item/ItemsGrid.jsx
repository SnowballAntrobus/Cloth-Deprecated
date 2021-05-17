import React, { Component } from "react";
import { itemApi } from "../../api";

class LinkItem extends Component {
  itemLink = (event) => {
    event.preventDefault();

    window.location.href = `/item/${this.props.id}`;
  };

  // <div onClick={this.itemLink}><img src={this.props.src} alt="product"/></div>

  render() {
    return (
      <div class="w-52 h-52 m-5 rounded overflow-hidden shadow-lg" onClick={this.itemLink}>
        <img src={this.props.src} alt="product" />
      </div>
    )
  }
}

class ItemsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount = async () => {
    await itemApi.getAllItems().then((items) => {
      this.setState({
        items: items.data.data,
      });
    });
  };

  render() {
    const { items } = this.state;

    const listItems = items.map((item) => (
      <LinkItem id={item._id} key={item._id} src={item.imageURL} />
    ));

    console.log("TCL: ItemsGrid -> render -> items", items);

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-items-center"> {listItems} </div>
      </div>
    );
  }
}

export default ItemsGrid;