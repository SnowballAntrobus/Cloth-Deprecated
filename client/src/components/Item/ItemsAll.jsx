import React, { Component } from "react";
import { itemApi } from "../../api";
import { ItemsView } from "./ItemsView"


class ItemsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  };

  componentDidMount = async () => {
    await itemApi.getAllItems().then((items) => {
      this.setState({
        items: items.data.data,
      });
    });
  };

  render() {
    const { items } = this.state;

    return (
      <div>
        <ItemsView items={items} />
      </div>
    );
  };
}

export default ItemsAll;