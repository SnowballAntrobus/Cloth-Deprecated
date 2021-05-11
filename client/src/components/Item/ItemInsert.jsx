import React, { useRef, useState } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";
import S3 from "react-aws-s3";
import randomBytes from "randombytes";

import { withAuthorization } from "../Session";

import { itemApi } from "../../api";

export const ItemsInsert = (props) => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [season, setSeason] = useState("");
  const fileInput = useRef();

  const handleChangeInputType = async (event) => {
    const type = event.target.value;
    setType(type);
  };

  const handleChangeInputBrand = async (event) => {
    const brand = event.target.value;
    setBrand(brand);
  };

  const handleChangeInputSeason = async (event) => {
    const season = event.target.value;
    setSeason(season);
  };

  const handleIncludeItem = async () => {
    const _id = randomBytes(20).toString('hex');
    const imageURL = `https://cloth-dev.s3.us-east-2.amazonaws.com/${_id}`;
    const description = "test"
    const w2c = [];

    const payload = { _id, imageURL, description, type, brand, season, w2c };

    setType("");
    setBrand("");
    setSeason("");

    await itemApi.insertItem(props.sessionStore.authUser, payload).then((res) => {
      uploadImage(_id);
      window.alert(`Item inserted successfully`);
    });
  };

  const uploadImage = (id) => {
    let file = fileInput.current.files[0];
    let newFileName = id;

    const config_S3 = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: process.env.REACT_APP_DIR_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config_S3);
    ReactS3Client.uploadFile(file, newFileName).then(data => {
      console.log(data);
    });
  };

  return (
    <div>
      <h1>Create Item</h1>

      <label>Image:</label>
      <input type="file" ref={fileInput}/>

      <label>Type: </label>
      <input type="text"
        value={type}
        onChange={handleChangeInputType}
      />

      <label>Brand: </label>
      <input
        type="text"
        value={brand}
        onChange={handleChangeInputBrand}
      />

      <label>Season: </label>
      <input
        type="text"
        value={season}
        onChange={handleChangeInputSeason}
      />

      <button onClick={handleIncludeItem}>Add Item</button>
      <a href={"/items/list"}>Cancel</a>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default compose(inject('sessionStore'),
  observer, withAuthorization(condition)
)(ItemsInsert);
