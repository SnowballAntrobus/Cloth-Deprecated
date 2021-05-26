import React, { Component } from "react";

class LinkItem extends Component {
  itemLink = (event) => {
    event.preventDefault();

    window.location.href = `/item/${this.props.id}`;
  };

  render() {
    return (
      <div className="w-52 h-52 m-5 rounded overflow-hidden shadow-lg" onClick={this.itemLink}>
        <img src={this.props.src} alt="product" />
      </div>
    )
  }
}

class ItemsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount = async () => {
      this.setState({
        items: this.props.items,
      });
  };

  render() {
    const { items } = this.state;

    const listItems = items.map((item) => (
      <LinkItem id={item._id} key={item._id} src={item.imageURL} />
    ));

    console.log("TCL: ItemsView -> render -> items", items);

    return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center"> {listItems} </div>
      </div>
    );
  }
}

export default ItemsView;