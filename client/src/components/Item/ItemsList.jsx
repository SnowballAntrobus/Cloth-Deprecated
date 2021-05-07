import React, { Component } from "react";
import ReactTable from "react-table-6";
import { itemApi } from "../../api";

import "react-table-6/react-table.css";

class UpdateItem extends Component {
  updateUser = (event) => {
    event.preventDefault();

    window.location.href = `/items/update/${this.props.id}`;
  };

  render() {
    return <button onClick={this.updateUser}>Update</button>;
  }
}

class DeleteItem extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the item ${this.props.id} permanently?`
      )
    ) {
      itemApi.deleteItemById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <button onClick={this.deleteUser}>Delete</button>;
  }
}

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      columns: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await itemApi.getAllItems().then((items) => {
      this.setState({
        items: items.data.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { items, isLoading } = this.state;
    console.log("TCL: ItemsList -> render -> items", items);

    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true,
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
      },
      {
        Header: "Brand",
        accessor: "brand",
        filterable: true,
      },
      {
        Header: "Season",
        accessor: "season",
        filterable: true,
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <DeleteItem id={props.original._id} />
            </span>
          );
        },
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <UpdateItem id={props.original._id} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!items.length) {
      showTable = false;
    }

    return (
      <div>
        {showTable && (
          <ReactTable
            data={items}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </div>
    );
  }
}

export default ItemsList;
