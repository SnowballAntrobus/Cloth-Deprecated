import React, { Component } from "react";

class ItemAdded extends Component {
    removeItem = (event) => {
        event.preventDefault();

        this.props.removeFromParent(this.props.item);
    }

    render() {
        return (
            <div>
                <div>Link: {this.props.item}</div>
                <button onClick={this.removeItem}>Remove</button>
            </div>
        );
    }
}

class ListUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItem: "",
            list: [],
        };
    }

    componentDidMount = () => {
        const list = this.props.list;

        this.setState({
            list: list
        });
    };

    handleChangeInputNewItem = async (event) => {
        const newItem = event.target.value.toLowerCase();
        this.setState({ newItem });
    };

    addToList = async (event) => {
        event.preventDefault();
        const newlist = [this.state.newItem]
        const list = this.state.list.concat(newlist);
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
            <ItemAdded item={item} key={item} removeFromParent={this.removeFromList}/>
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

export { ListUpdate };