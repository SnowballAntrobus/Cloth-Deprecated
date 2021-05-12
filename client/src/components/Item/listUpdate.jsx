import React, { Component } from "react";

class listUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItem: "",
            list: this.props.match.params.list,
        };
    }

    handleChangeInputNewItem = async (event) => {
        const newItem = event.target.value.toLowerCase();
        this.setState({ newItem });
    };

    addToList = async () => {
        const list = this.state.list.push(this.state.newItem);
        this.props.setList(list);
        this.setState({ list: list, newItem: "" });
    }

    removeFromList = async (itemToRemove) => {
        const list = this.state.list.filter(
            (item) => item !== itemToRemove
        )
        this.props.setList(list);
        this.setState({ list });
    }
 
    render() {
        const { newItem, list } = this.state;

        const listItems = list.map((item) => (
            <div>
                <div>Link: {item}</div>
                <button onClick={this.removeFromList(item)}>Remove</button>
            </div>
        ));

        return (
            <div>
                <div className="grid grid-cols-1"> {listItems} </div>
                <input type="text"
                    value={newItem}
                    onChange={this.handleChangeInputNewItem}
                />
                <button onClick={this.addToList}>Add</button>
            </div>
        );
    }
}

export default listUpdate;