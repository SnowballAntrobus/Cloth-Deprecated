import React, { Component } from "react";

import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

class AddItemToCloset extends Component {
  addToCloset = (event) => {
    event.preventDefault();
  
    window.location.href = `/review/create/${this.props.item}/${this.props.seller}/`;
  };

  render() {
    return <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={this.addToCloset}>Add to Closet</button>;
  }
}

export default compose(inject('sessionStore'),
  observer
)(AddItemToCloset);