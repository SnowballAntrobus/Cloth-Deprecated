import React, { useRef, useState, useEffect } from "react";
import { inject, observer } from 'mobx-react';
import { compose } from "recompose";

import { withAuthorization } from "../Session";

import { reviewApi } from "../../api";

export const ReviewCreate = (props) => {
  const [uid, setUid] = useState("");
  const [item, setItem] = useState("")
  const [seller, setSeller] = useState("");

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [size, setSize] = useState("");

  const [fit, setFit] = useState(0);
  const [quality, setQuality] = useState(0);
  const [similarity, setSimilarity] = useState(0);
  const [fire, setFire] = useState(0);

  const [description, setDescription] = useState("");
  const [imagesLink, setLink] = useState("");

  useEffect(() => {
    setUid(props.uid);
    setItem(props.item);
    setSeller(props.seller);
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

  const handleChangeInputSimilarity = async (event) => {
    const similarity = event.target.value;
    setSimilarity(similarity);
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

    if(!(height && weight && size && fit && quality && similarity && fire && description)) {
      window.alert(`Missing fields`);
      return
    };

    const payload = {uid, item, seller, height, weight, size, fit, quality, similarity, fire, description, imagesLink};

    reviewApi.createReview(props.sessionStore.authUser, uid, payload).then((res) => {
      window.alert(`Review added!`);
    });
  };

  return (

  );
}

const condition = (authUser) => !!authUser;

export default compose(inject('sessionStore'),
  observer, withAuthorization(condition)
)(ReviewCreate);