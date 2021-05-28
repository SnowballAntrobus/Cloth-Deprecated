import React, { useState, useEffect } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { withAuthorization } from "../Session";

import { reviewApi, userApi, sellerApi, itemApi, closetApi } from "../../api";

export const ReviewCreate = (props) => {
  const [uid, setUid] = useState("");
  const [item, setItem] = useState("");
  const [seller, setSeller] = useState("");

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [size, setSize] = useState("");

  const [fit, setFit] = useState(0);
  const [quality, setQuality] = useState(0);
  const [accuracy, setaccuracy] = useState(0);
  const [fire, setFire] = useState(0);

  const [description, setDescription] = useState("");
  const [imagesLink, setLink] = useState("");

  useEffect(() => {
    setUid(props.sessionStore.authUser.uid);
    setItem(props.match.params.item);
    setSeller(props.match.params.seller);
  }, []);

  const handleChangeInputHeight = async (event) => {
    const height = event.target.value;
    setHeight(height);
  };

  const handleChangeInputWeight = async (event) => {
    const weight = event.target.value;
    setWeight(weight);
  };

  const handleChangeInputSize = async (event) => {
    const size = event.target.value;
    setSize(size);
  };

  const handleChangeInputFit = async (event) => {
    const fit = event.target.value;
    setFit(fit);
  };

  const handleChangeInputQuality = async (event) => {
    const quality = event.target.value;
    setQuality(quality);
  };

  const handleChangeInputAccuracy = async (event) => {
    const accuracy = event.target.value;
    setaccuracy(accuracy);
  };

  const handleChangeInputFire = async (event) => {
    const fire = event.target.value;
    setFire(fire);
  };

  const handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    setDescription(description);
  };

  const handleChangeInputLink = async (event) => {
    const link = event.target.value;
    setLink(link);
  };

  const handleCreateReview = async (event) => {

    event.preventDefault();

    if (!(height && weight && size && fit && quality && accuracy && fire && description)) {
      window.alert(`Missing fields`);
      return
    };

    const payload = { uid, item, seller, height, weight, size, fit, quality, accuracy, fire, description, imagesLink };

    const itemPayload = await itemApi.getItemById(item).data.data;
    const userPayload = await userApi.getUserById(uid).data.data;
    const sellerPayload = await sellerApi.getSellerById(seller).data.data;
    const closetPayload = await closetApi.getClosetById(uid).data.data;

    const review = await reviewApi.createReview(props.sessionStore.authUser, uid, payload);
    
    closetPayload.reviews.push(review);
    closetPayload.items.push(item);

    itemPayload.reviews.push(review);
    userPayload.reviews.push(review);
    sellerPayload.reviews.push(review);

    await closetPayload.updateClosetById(props.sessionStore.authUser, uid, closetPayload);
    await itemApi.updateItemById(props.sessionStore.authUser, item, itemPayload);
    await userApi.updateUserById(props.sessionStore.authUser, uid, userPayload);
    await sellerApi.updateSellerById(props.sessionStore.authUser, seller, sellerPayload);

    window.alert(`Item added to closet!`)
  };

  return (
    <div class="flex">
      <form class="flex-auto p-6">
        <div class="flex items-baseline mt-4 mb-6">
          <div class="space-x-2 flex">
            <label className="block text-sm font-medium text-gray-700">
              Height
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="number"
                value={height}
                onChange={handleChangeInputHeight}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="in centimeters"
              />
            </div>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          <div class="space-x-2 flex">
            <label className="block text-sm font-medium text-gray-700">
              Weight
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="number"
                value={weight}
                onChange={handleChangeInputWeight}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="in kilograms"
              />
            </div>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          <div class="space-x-2 flex">
            <label className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="text"
                value={size}
                onChange={handleChangeInputSize}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="L"
              />
            </div>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          Fit
          <div class="space-x-2 flex" onChange={handleChangeInputFit}>
            <label>
              <input class="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg" name="fit" type="radio" value="-2"/>
              Too small
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fit" type="radio" value="-1" />
              Slim
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fit" type="radio" value="0" checked/>
              Neutral
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fit" type="radio" value="1" />
              Oversized
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fit" type="radio" value="2" />
              Too large
            </label>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          Quality
          <div class="space-x-2 flex" onChange={handleChangeInputQuality}>
            <label>
              <input class="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg" name="quality" type="radio" value="-2"/>
              Trash
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="quality" type="radio" value="-1" />
              Low
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="quality" type="radio" value="0" checked/>
              Medium
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="quality" type="radio" value="1" />
              High
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="quality" type="radio" value="2" />
              Exceptional
            </label>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          Accuracy
          <div class="space-x-2 flex" onChange={handleChangeInputAccuracy}>
            <label>
              <input class="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg" name="accuracy" type="radio" value="-2"/>
              Call Out
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="accuracy" type="radio" value="-1" />
              Low
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="accuracy" type="radio" value="0" checked/>
              Average
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="accuracy" type="radio" value="1" />
              High
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="accuracy" type="radio" value="2" />
              1:1
            </label>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          General
          <div class="space-x-2 flex" onChange={handleChangeInputFire}>
            <label>
              <input class="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg" name="fire" type="radio" value="-2"/>
              Trash
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fire" type="radio" value="-1" />
              Overvalue
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fire" type="radio" value="0" checked/>
              Value
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fire" type="radio" value="1" />
              Undervalue
            </label>
            <label>
              <input class="w-9 h-9 flex items-center justify-center" name="fire" type="radio" value="2" />
              Fire
            </label>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          <div class="space-x-2 flex">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="text"
                value={description}
                onChange={handleChangeInputDescription}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="write a review"
              />
            </div>
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6">
          <div class="space-x-2 flex">
            <label className="block text-sm font-medium text-gray-700">
              Images Link
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="text"
                value={imagesLink}
                onChange={handleChangeInputLink}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="imgur link"
              />
            </div>
          </div>
        </div>
        <div class="flex space-x-3 mb-4 text-sm font-medium">
            <button class="w-1/2 flex items-center justify-center rounded-md bg-black text-white" onClick={handleCreateReview}>Add to Closet</button>
        </div>   
      </form>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default compose(inject('sessionStore'),
  observer, withAuthorization(condition)
)(ReviewCreate);