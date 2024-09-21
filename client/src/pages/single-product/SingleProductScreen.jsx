import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import Header from "../../layouts/Header";
import Layout from "../../layouts/Layout";
import ProductDetail from "./container/ProductDetail";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import BackButton from "../../components/BackButton";
import { productCreateReviewActions } from "../../reducers/productReducers";
import Alert from "../../components/Alert";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const SingleProductScreen = () => {
  const { id: productId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productCreateReview;

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted!");
      setRating(0);
      setComment("");
      dispatch(productCreateReviewActions.productCreateReviewReset());
    }

    dispatch(listProductDetails(productId));
  }, [productId, dispatch, successProductReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };
