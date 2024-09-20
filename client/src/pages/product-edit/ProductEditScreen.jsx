import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../components/Alert";
import FormContainer from "../../components/FormContainer";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { productUpdateActions } from "../../reducers/productReducers";

const ProductEditScreen = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });
  const [uploading, setUploading] = useState(false);
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  useEffect(() => {
    if (!userLoginInfo || !userLoginInfo?.isAdmin) {
      navigate("/login");
    }

    if (successUpdate) {
      dispatch(productUpdateActions.productUpdateReset());
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setInputValues({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
        });
      }
    }
  }, [dispatch, navigate, userLoginInfo, product, productId, successUpdate]);