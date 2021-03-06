import React, { Component } from "react";
import { closetApi } from "../../api";
import { ItemsView } from "./ItemsView"


class ClosetView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      items: [],
    };
  };

  componentDidMount = async () => {
    const { id } = this.state;
    await closetApi.getClosetById(id).then((closet) => {
      this.setState({
        items: closet.data.data.items,
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

export default ClosetView;