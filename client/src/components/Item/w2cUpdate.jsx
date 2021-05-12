import React, { Component } from "react";

class w2cUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItem: "",
            w2c: this.props.match.params.w2c,
        };
    }

    handleChangeInputNewItem = async (event) => {
        const newItem = event.target.value.toLowerCase();
        this.setState({ newItem });
    };

    addW2c = async () => {
        const w2c = this.state.w2c.push(this.state.newItem);
        this.props.setW2c(w2c);
        this.setState({ w2c: w2c, newItem: "" });
    }

    removeW2c = async (itemToRemove) => {
        const w2c = this.state.w2c.filter(
            (item) => item !== itemToRemove
        )
        this.props.setW2c(w2c);
        this.setState({ w2c });
    }
 
    render() {
        const { newItem, w2c } = this.state;

        const listItems = w2c.map((item) => (
            <div>
                <div>Link: {item}</div>
                <button onClick={this.removeW2c(item)}>Remove</button>
            </div>
        ));

        return (
            <div>
                <div className="grid grid-cols-1"> {listItems} </div>
                <input type="text"
                    value={newItem}
                    onChange={this.handleChangeInputNewItem}
                />
                <button onClick={this.addW2c}>Add</button>
            </div>
        );
    }
}

export default w2cUpdate;