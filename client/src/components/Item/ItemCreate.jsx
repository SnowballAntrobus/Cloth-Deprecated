import React, { useRef, useState } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";
import S3 from "react-aws-s3";
import randomBytes from "randombytes";

import { withAuthorization } from "../Session";

import { itemApi, sellerApi } from "../../api";

import { ListUpdate } from "./ListUpdate"

export const ItemCreate = (props) => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState([]);
  const [season, setSeason] = useState("");

  const [sellerNames, setSellerNames] = useState([]);
  const [w2c, setW2c] = useState([]);

  const fileInput = useRef();

  const handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    setDescription(description.toLowerCase());
  };

  const handleChangeInputType = async (event) => {
    const type = event.target.value;
    setType(type.toLowerCase());
  };

  const handleChangeInputSeason = async (event) => {
    const season = event.target.value;
    setSeason(season.toLowerCase());
  };

  const handleCreateItem = async (event) => {

    event.preventDefault();

    const uploadImage = (id) => {
      let file = fileInput.current.files[0];
      let newFileName = id;
  
      const config_S3 = {
        bucketName: process.env.REACT_APP_AMAZON_S3_BUCKET_NAME,
        dirName: process.env.REACT_APP_AMAZON_S3_DIR_NAME,
        region: process.env.REACT_APP_AMAZON_S3_REGION,
        accessKeyId: process.env.REACT_APP_AMAZON_S3_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_AMAZON_S3_ACCESS_KEY,
      };
  
      const ReactS3Client = new S3(config_S3);
      ReactS3Client.uploadFile(file, newFileName).then(data => {
      });
    };

    if(!(description && type && brand && season)) {
      window.alert(`Missing fields`);
      return
    }

    if (fileInput.current.files[0] === undefined){
      window.alert(`Missing image file`);
      return
    }

    const filetype = fileInput.current.files[0].type.split("/")[1];
    if (filetype !== "png" && filetype !== "jpeg") {
      window.alert(`Image is not a png or jpg`);
      return
    }
    if (fileInput.current.files[0].size > 1000000) {
      window.alert(`Image file is larger than 500kb`);
      return
    }

    const _id = randomBytes(12).toString('hex');
    const imageURL = `https://cloth-dev.s3.us-east-2.amazonaws.com/images/${_id}.${filetype}`;

    const sellers = [];

    //terribly inefficeint temp code comes next!!!
    const currSellers = sellerApi.getAllSellers();
    for (const nameIndex in sellerNames) {
      const name = sellerNames[nameIndex];
      const seller = null;
      for (const c in currSellers) {
        if (name == currSellers[c].name) {
          seller = currSellers[c]._id;
        }
      }
      if(!seller) {
        const payload = { name };
        seller =  await sellerApi.createSeller(props.sessionStore.authUser, payload);
      }
      sellers.push(seller);
    }

    const payload = { _id, description, imageURL, type, brand, season, sellers, w2c };

    setDescription("");
    setType("");
    setBrand([]);
    setSeason("");
    setSellers([]);
    setW2c([]);

    itemApi.createItem(props.sessionStore.authUser, payload).then((res) => {
      uploadImage(_id);
      window.alert(`Item added!`);
    });
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Item</h3>
            <p className="mt-1 text-sm text-gray-600">
              Thanks for contributing!
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input type="file" ref={fileInput}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input type="text"
                          value={description}
                          onChange={handleChangeInputDescription}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="Freya Hartas GG animal wool sweater"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input type="text"
                          value={type}
                          onChange={handleChangeInputType}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="pants, shirt, shoes"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <ListUpdate list={brand} setList={setBrand}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Season
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input type="text"
                          value={season}
                          onChange={handleChangeInputSeason}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="fall 2020, winter 1999, spring 2016"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sellers W2C
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <ListUpdate list={sellerNames} setList={setSellerNames}/>
                        <ListUpdate list={w2c} setList={setW2c}/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleCreateItem}>Add Item</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default compose(inject('sessionStore'),
  observer, withAuthorization(condition)
)(ItemCreate);
