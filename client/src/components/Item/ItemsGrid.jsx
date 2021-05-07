import React, { Component } from "react";
import { itemApi } from "../../api";

class LinkItem extends Component {
  itemLink = (event) => {
    event.preventDefault();

    window.location.href = `/item/${this.props.id}`;
  };

  render() {
    return <div onClick={this.itemLink}>ItemIMAGELink</div>;
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
      <LinkItem id={item._id} key={item._id} />
    ));

    console.log("TCL: ItemsGrid -> render -> items", items);

    return (
      <div>
        <h1>Grid</h1>
        <div className="grid grid-cols-1 md:grid-cols-2">{listItems}</div>
      </div>
    );
  }
}

export default ItemsGrid;
